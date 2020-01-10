import {
  loadProducts,
  loadCategories
} from './store/actions'
import { LANGUAGE } from './constants'

export const getIfMissing = (store, query, loader) => {
  const { dispatch } = store
  return dispatch(loader(query))
}

export const needProducts = (store, query) => {
  return getIfMissing(store, query, loadProducts)
}
export const needCategories = (store, query) => {
  return getIfMissing(store, query, loadCategories)
}
export const get = (object, path, defaultValue) => {
  const recur = (object, path) => {
    if (object === undefined) {
      return defaultValue
    }
    if (path.length === 0) {
      return object
    }
    return recur(object[path[0]], path.slice(1))
  }
  return recur(object, path)
}
// sort keys in query to always get the same json string for query key
export const queryAsKey = query =>
  JSON.stringify(
    Object.entries(query)
      .sort(([keyA], [keyB]) => keyA.localeCompare(keyB))
      .reduce((result, [key, value]) => {
        result[key] = value
        return result
      }, {})
  )
const uriKeyValue = (key, value) => {
  if (key === 'category') {
    return (
      'filter=' +
      encodeURIComponent(
        `categories.id:subtree("${value}")`
      )
    )
  }
  if (key === 'q') {
    return (
      `text.${LANGUAGE}=` +
      encodeURIComponent(value) +
      '&fuzzy=false'
    )
  }
  if (key === 'slug') {
    return `filter=${encodeURIComponent(
      `slug.${LANGUAGE}`
    )}:"${encodeURIComponent(value)}"`
  }
  return `${encodeURIComponent(key)}=${encodeURIComponent(
    value
  )}`
}
export const toUrl = (
  baseUrl,
  { query: { pageSize, page, ...query } }
) => {
  const queryParams = Object.entries(query)
  queryParams.push(['limit', pageSize])
  queryParams.push(['offset', pageSize * (page - 1)])
  if (!query.sort) {
    queryParams.push(['sort', `name.${LANGUAGE} asc`])
  }
  return (
    baseUrl +
    '?' +
    queryParams
      .reduce(
        (result, [key, value]) =>
          result.concat(uriKeyValue(key, value)),
        []
      )
      .join('&')
  )
}
export const withPage = ({
  page = 1,
  pageSize = 20,
  ...query
}) => ({
  page,
  pageSize,
  ...query
})
