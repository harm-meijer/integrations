import React from 'react'
import Layout from '../components/Layout'
import { needProducts, needCategories } from '../helpers'
import ProductList from '../components/ProductList'
import {
  selectQuery,
  selectCategoryBySlug,
  selectProductsList
} from '../store/selectors'
import IntegrationsHeader from '../components/IntegrationsHeader'

function ProductsOfCategory(props) {
  return (
    <Layout
      title={props.title}
      metaDescription={props.metaDescription}
      metaKeywords={props.metaKeywords}
      header={IntegrationsHeader}
    >
      <ProductList
        path="integrations"
        queryKey="category"
        title={props.title}
        subTitle={props.subTitle}
      />
    </Layout>
  )
}
ProductsOfCategory.getInitialProps = ({ store }) => {
  const query = selectQuery(store.getState())
  if (process.env.SERVER_HYDRATE) {
    return Promise.all([
      needCategories(store, query),
      needProducts(store, query)
    ]).then(() => {
      const category = selectCategoryBySlug(
        store.getState(),
        query.category
      )
      const title = category?.name
      const subTitle = category?.description
      const products = selectProductsList(
        store.getState(),
        query
      )
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
