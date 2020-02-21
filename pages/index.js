import React from 'react'
import Layout from '../components/Layout'
import { needProducts, needCategories } from '../helpers'
import {
  selectCategoriesData,
  asCategory
} from '../store/selectors'
import ProductList from '../components/ProductList'
import Section from '../components/Section';

function HomePage(props) {
  return (
    <Layout
      title={props.title}
      metaDescription={props.subTitle}
    >
      {props.list.map(([query, title, subTitle]) => (
        <React.Fragment key={title}>
          <Section header={title} subHeader={subTitle}/>
          <ProductList query={query} columns={4} />
        </React.Fragment>
      ))}
    </Layout>
  )
}
HomePage.getInitialProps = ({ store, query }) => {
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
