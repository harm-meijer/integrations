import React from 'react'
import Layout from '../components/Layout'
import {
  needProducts,
  needCategories,
  withPage
} from '../helpers'
import { selectQuery } from '../store/selectors'
import ProductList from '../components/ProductList'

function HomePage({ query }) {
  return (
    <Layout title="Home">
      {/* <ProductList
        query={withPage({
          pageSize: 2
        })}
        title="Popular Products"
        columns={4}
      /> */}
      <ProductList
        query={query}
        title="Other Products"
        columns={6}
      />
    </Layout>
  )
}
HomePage.getInitialProps = ({ store }) => {
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

export default HomePage
