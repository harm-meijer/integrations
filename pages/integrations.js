import React from 'react'
import Layout from '../components/Layout'
import { needProducts, needCategories } from '../helpers'
import ProductList from '../components/ProductList'
import {
  selectCategoryBySlug,
  selectProductsList,
  useResults
} from '../store/selectors'
// import IntegrationsHeader from '../components/IntegrationsHeader'
import Section from '../components/Section'

function ProductsOfCategory(props) {
  return (
    <Layout
      title={props.title}
      metaDescription={props.metaDescription}
      metaKeywords={props.metaKeywords}
    >
      <Section
        header={props.title}
        subHeader={props.subTitle}
      />
      <ProductList
        path="integrations"
        queryKey="category"
      />
    </Layout>
  )
}
ProductsOfCategory.getInitialProps = ({ store, query }) => {
  if (process.env.SERVER_HYDRATE) {
    return Promise.all([
      needCategories(store, query),
      needProducts(store, query)
    ]).then(() => {
      const category = selectCategoryBySlug(
        store.getState(),
        query.category
      )
      const title = category?.name || 'All Available Integrations'
      const subTitle = category?.description
      const { value: products = [] } = useResults([
        selectProductsList(store.getState(), query)
      ])(([products]) => products)
      return {
        query,
        title,
        subTitle,
        metaDescription: subTitle,
        metaKeywords: products.reduce(
          (result, product) =>
            result +
            (product.searchKeywords
              ? `,${product.searchKeywords}`
              : ''),
          ''
        )
      }
    })
  }
  return {
    title: 'need getInitialProps',
    query
  }
}
export default ProductsOfCategory
