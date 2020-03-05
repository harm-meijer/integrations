import React from 'react'
import Layout from '../components/Layout'
import { needProducts, needCategories } from '../helpers'
import {
  selectCategoriesData,
  asCategory
} from '../store/selectors'
import ProductList from '../components/ProductList'
import Section from '../components/Section'
import Banner from '../components/Banner'

function After({ index }) {
  if (index === 0) {
    //(<Banner title="Browse all official third party integration and extensions" content="This is content"/>);
  }
  return ''
}
function Before({ index }) {
  if (index === 0) {
    // return (
    //   <div>TEST</div>
    // );
  }
  return ''
}

function HomePage(props) {
  return (
    <div>
      <div>port: {process.env.port}</div>
      <div>language: {process.env.LANGUAGE}</div>
      <div>node_env: {process.env.NODE_ENV}</div>
      <div>works:{process.env.WORKS}</div>
    </div>
  )
}
HomePage.getInitialProps = ({ store, query }) => {
  return {
    title: 'commercetools Integration Marketplace',
    subTitle:
      'Browse official third party integrations and extensions',
    list: [],
    query
  }
  if (process.env.SERVER_HYDRATE) {
    return needCategories(store, query)
      .then(() => {
        const categories = Object.values(
          selectCategoriesData(store.getState())
        )
        const list = process.env.HOME_PAGE_CATEGORIES.map(
          key => categories.find(c => c.key === key)
        )
          .map(asCategory)
          .map(c => [
            {
              ...query,
              category: c.slug,
              pageSize: 8
            },
            c.name,
            c.description
          ])
        return Promise.all(
          [list].concat(
            list.map(([query]) =>
              needProducts(store, query)
            )
          )
        )
      })
      .then(([list]) => {
        return {
          title: 'commercetools Integration Marketplace',
          subTitle:
            'Browse official third party integrations and extensions',
          list,
          query
        }
      })
  }
  return {
    title: 'commercetools Integration Marketplace',
    subTitle:
      'Browse official third party integrations and extensions',
    list: [],
    query
  }
}

export default HomePage
