import React from 'react'
import Layout from '../components/Layout'
import { needProducts, needCategories } from '../helpers'
import {
  selectQuery,
  selectCategoriesData,
  asCategory
} from '../store/selectors'
import ProductList from '../components/ProductList'
import IndexHeaderHeader from '../components/IndexHeader'

function HomePage(props) {
  return (
    <Layout
      title={props.title}
      metaDescription={props.subTitle}
      header={IndexHeaderHeader({
        title: props.title,
        subTitle: props.subTitle
      })}
    >
      {props.list.map(([query, title, subTitle]) => (
        <React.Fragment key={title}>
          <h1 className="integration-header">{title}</h1>
          <h3 className="integration-header small">
            {subTitle}
          </h3>
          <ProductList query={query} columns={4} />
        </React.Fragment>
      ))}
    </Layout>
  )
}
HomePage.getInitialProps = ({ store }) => {
  const query = selectQuery(store.getState())
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
          [list],
          ...list.map(([query]) =>
            needProducts(store, query)
          )
        )
      })
      .then(([list]) => {
        return {
          title: 'Integrations',
          subTitle: 'Commercetools Integrations',
          list,
          query
        }
      })
  }
  return {
    title: 'Integrations',
    subTitle: 'Commercetools Integrations',
    list: [],
    query
  }
}

export default HomePage
