import React from 'react'
import Layout from '../components/Layout'
import { needProducts, needCategories } from '../helpers'
import ProductList from '../components/ProductList'
import {
  selectQuery,
  selectProductsList,
  useResults
} from '../store/selectors'
import IndexHeaderHeader from '../components/IndexHeader'

function ProductsSearch(props) {
  return (
    <Layout
      title={props.title}
      subTitle={props.subTitle}
      header={IndexHeaderHeader({
        title: props.title,
        subTitle: props.subTitle
      })}
    >
      <ProductList path="search" queryKey="q" />
    </Layout>
  )
}
ProductsSearch.getInitialProps = ({ store, query }) => {
  if (process.env.SERVER_HYDRATE) {
    return Promise.all([
      needCategories(store, query),
      needProducts(store, query)
    ]).then(() => {
      const { value: products = [] } = useResults([
        selectProductsList(store.getState(), query)
      ])(([products]) => products)
      return {
        query,
        title: `Search results for: ${query.q}`,
        subTitle: products.length
          ? `Found ${products.length} result${
              products.length > 1 ? 's' : ''
            }`
          : 'No results found'
      }
    })
  }
  return {
    query
  }
}
export default ProductsSearch
