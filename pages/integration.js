import React from 'react'
import Layout from '../components/Layout'
import { needProducts, needCategories } from '../helpers'
import {
  selectQuery,
  selectProductBySlug
} from '../store/selectors'
import ProductDetail from '../components/ProductDetail'
import ProductDetailHeaderContainer from '../components/ProductDetailHeader'

function ProductDetailPage({
  productName,
  metaDescription,
  metaKeywords
}) {
  return (
    <Layout
      title={productName}
      metaDescription={metaDescription}
      metaKeywords={metaKeywords}
      header={ProductDetailHeaderContainer}
    >
      <ProductDetail />
    </Layout>
  )
}
ProductDetailPage.getInitialProps = ({ store }) => {
  const query = selectQuery(store.getState())
  if (process.env.SERVER_HYDRATE) {
    return Promise.all([
      needCategories(store, query),
      needProducts(store, query)
    ]).then(() => {
      const product = selectProductBySlug(
        store.getState(),
        query.slug
      )
      return {
        query,
        productName: product.name,
        metaDescription: product.metaDescription,
        metaKeywords: product.searchKeywords || ''
      }
    })
  }
  return {
    productName: 'need getInitialProps',
    query
  }
}

export default ProductDetailPage
