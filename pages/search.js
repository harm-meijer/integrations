import React from 'react'
import Layout from '../components/Layout'
import { needProducts, needCategories } from '../helpers'
import ProductList from '../components/ProductList'
import { selectQuery } from '../store/selectors'

function ProductsSearch(props) {
  return (
    <Layout title={`Search results for: ${props.query.q}`}>
      <ProductList
        path="search"
        queryKey="q"
        title={`Results for: ${props.query.q}`}
      />
    </Layout>
  )
}
ProductsSearch.getInitialProps = ({ store }) => {
  const query = selectQuery(store.getState())
  if (process.env.SERVER_HYDRATE) {
    return Promise.all([
      needCategories(store, query),
      needProducts(store, query)
    ]).then(() => ({ query }))
  }
  return {
    query
  }
}
export default ProductsSearch
