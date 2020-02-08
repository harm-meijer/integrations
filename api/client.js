import fetch from 'isomorphic-unfetch'
import { selectCategoriesData } from '../store/selectors'
import { loadCategories } from '../store/actions'
import { get, toUrl, withPage } from '../helpers'
import { group, makeConfig } from './shared'
import { LANGUAGE, API, LOCAL_API } from '../constants'

const API_URL = process.browser ? API : LOCAL_API
const later = time => new Promise(r => setTimeout(r, time))
const fetchJson = (...args) =>
  later(2000)
    .then(() => fetch(...args))
    .then(result => result.json())
const cache = process.browser ? new Map() : global.cache
const groupFetchJson = group(fetchJson, cache)

export const getProducts = (query, getState, dispatch) => {
  return dispatch(loadCategories()).then(() => {
    const categories = selectCategoriesData(getState())
    const queryCopy = { ...query } //copy query to prevent mutating
    const category = Object.values(categories).find(
      category =>
        get(category, ['slug', LANGUAGE], {}) ===
        query['category']
    )
    if (category) {
      queryCopy.category = category.id
    }
    const url = toUrl(`${API_URL}/product-projections`, {
      query: queryCopy
    })
    return groupFetchJson(url, makeConfig())
  })
}

export const getCategories = () => {
  const pageSize = 500
  const recur = (query, ret) => {
    const url = toUrl(`${API_URL}/categories`, { query })
    return groupFetchJson(url, makeConfig()).then(
      ({ results, total }) => {
        const newResult = ret.concat(results)
        if (newResult.length < total) {
          return recur(
            { ...query, page: query.page + 1 },
            newResult
          )
        }
        return { results: newResult, total }
      }
    )
  }
  return recur(withPage({ pageSize }), [])
}
