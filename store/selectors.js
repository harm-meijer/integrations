import { createSelector } from 'reselect'
import { get, queryAsKey } from '../helpers'
import { LANGUAGE } from '../constants'

const NOT_REQUESTED = {
  requested: false,
  loading: false
}
const AVAILABLE = {
  requested: true,
  loading: false
}
export const selectCategories = state => state.categories
export const selectProducts = state => state.products
export const selectCompareProducts = state =>
  state.addedItemsToCompare
export const selectQuery = state => state.query
export const selectAddedItems = state => state.addedItems
export const selectCategoriesRequested = createSelector(
  selectCategories,
  categories => categories.requested
)
export const selectProductsData = state =>
  state.products.data
export const selectCategoriesData = createSelector(
  selectCategories,
  categories => categories.data
)
export const selectProductPage = createSelector(
  selectProducts,
  (_, query) => query,
  (products, queryWithPage) => {
    const { page, ...query } = queryWithPage
    return get(
      products,
      [queryAsKey(query), page],
      NOT_REQUESTED
    )
  }
)
export const selectProductsRequested = createSelector(
  selectProductPage,
  result => {
    return result.requested
  }
)
export const asCategory = category => ({
  ...category,
  slug: category.slug[LANGUAGE],
  name: category.name[LANGUAGE],
  description: category.description?.[LANGUAGE],
  subCategories: []
})
const asProduct = cat => product => {
  const {
    id,
    masterVariant,
    lastModifiedAt,
    categories,
    assets
  } = product

  return {
    id,
    ...masterVariant.attributes.reduce(
      (result, { name, value }) => {
        result[name] = value
        return result
      },
      {}
    ),
    categories: categories
      .filter(category => category.typeId === 'category')
      .map(({ id }) => asCategory(cat[id])),
    assets: masterVariant.assets,
    logo: masterVariant.images.find(
      ({ label }) => label === 'logo'
    )?.url,
    screenshots: masterVariant.images
      .filter(image => image.label !== 'logo')
      .map(image => image.url),
    lastModifiedAt,
    ...[
      'metaDescription',
      'metaTitle',
      'name',
      'slug',
      'searchKeywords',
      'description'
    ].reduce((result, key) => {
      result[key] = product[key]?.[LANGUAGE]
      return result
    }, {})
  }
}
const isResult = value =>
  ['loading', 'requested'].reduce(
    // eslint-disable-next-line no-prototype-builtins
    (result, key) => result && value.hasOwnProperty(key),
    true
  )
const asResult = (value = {}) =>
  isResult(value)
    ? value
    : {
        ...AVAILABLE,
        value
      }
// skips calling passed in function if any of the values is loading or has error
export const useResults = values => fn => {
  const resultValues = values.map(asResult)
  return resultValues.reduce(
    (available, result) =>
      available &&
      !result.error &&
      !result.loading &&
      result.requested,
    true
  )
    ? asResult(fn(resultValues.map(result => result.value)))
    : resultValues.find(
        result =>
          result.error || result.loading || !result.loading
      )
}

export const selectProductsList = createSelector(
  selectProductPage,
  selectCategoriesData, //@todo: categoriesData should return result as it can fail
  selectProductsData,
  (productsResult, categories, data) => {
    return useResults([
      productsResult,
      categories
    ])(([productPage, categories]) =>
      productPage.ids
        .map(id => data[id])
        .map(asProduct(categories))
    )
  }
)
export const selectProductColumns = createSelector(
  selectProductsList,
  (a, b, colums) => colums,
  (productsResult, columns) =>
    useResults([productsResult])(([products]) =>
      products.reduce((result, product, index) => {
        if (index % columns === 0) {
          result.push([])
        }
        result[result.length - 1].push(product)
        return result
      }, [])
    )
)
export const selectAllCategories = createSelector(
  selectCategoriesData,
  data => Object.values(data).map(asCategory)
)
export const selectAllCategoriesNested = createSelector(
  selectAllCategories,
  categories => {
    const categoriesMap = categories.reduce(
      (categories, category) =>
        categories.set(category.id, category),
      new Map()
    )
    const recur = categories => {
      const newCategories = categories.filter(category => {
        if (
          category.parent &&
          category.parent.typeId === 'category'
        ) {
          const parent = categoriesMap.get(
            category.parent.id
          )
          parent && parent.subCategories.push(category)
          return false
        }
        return true
      })
      if (newCategories.length === categories.length) {
        return recur(newCategories)
      }
      return
    }
    // mutate to set children even if order is not
    //   root - child -child of child
    recur(categories)
    return categories
  }
)
export const selectNestedCategoriesWithRoot = createSelector(
  selectAllCategoriesNested,
  (_, root) => root,
  (categories, root) => {
    return categories.filter(category =>
      root.includes(category.key)
    )
  }
)
// because process.env.MENU_CATEGORY will be
//  replaced with ["the","value"] in compile time
//  it will break memoization of selectors ([]!==[])
//  this will fix it
const getMenuCategory = (result => () => result)(
  process.env.MENU_CATEGORY
)
export const selectMenuCategoriesNested = state => {
  return selectNestedCategoriesWithRoot(
    state,
    getMenuCategory()
  )
}
export const selectMenuCategories = createSelector(
  selectMenuCategoriesNested,
  nestedCategories => {
    const reduceChildren = (result, item) =>
      !item.subCategories.length
        ? result.set(item.id, item)
        : item.subCategories.reduce(
            reduceChildren,
            result.set(item.id, item)
          )
    return nestedCategories.reduce(
      reduceChildren,
      new Map()
    )
  }
)
export const selectCategoryBySlug = createSelector(
  selectCategoriesData,
  (_, slug) => slug,
  (data, slug) => {
    const category = Object.values(data).find(
      category =>
        category.slug[process.env.LANGUAGE] === slug
    )
    return category && asCategory(category)
  }
)
