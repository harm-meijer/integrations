import React from 'react'
import Layout from '../../components/Layout'
import { needProducts, needCategories } from '../../helpers'
import {
  selectProductsList,
  useResults
} from '../../store/selectors'
import ProductDetail from '../../components/ProductDetail'
import ProductDetailHeader from '../../components/ProductDetailHeader'

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
      SubHeader={ProductDetailHeader}
    >
      <div>
        <ProductDetail />
      </div>
    </Layout>
  )
}
ProductDetailPage.getInitialProps = ({ store, query }) => {
  if (process.env.SERVER_HYDRATE) {
    return Promise.all([
      needCategories(store, query),
      needProducts(store, query)
    ]).then(() => {
      const { value: product = {} } = useResults([
        selectProductsList(store.getState(), query)
      ])(([p]) => p[0])
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
