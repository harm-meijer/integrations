import fetch from 'isomorphic-unfetch'
import { selectCategoriesData } from '../store/selectors'
import { loadCategories } from '../store/actions'
import { get, toUrl, withPage } from '../helpers'
import { LANGUAGE, API, LOCAL_API } from '../constants'

const API_URL = process.browser ? API : LOCAL_API
const cache = process.browser
  ? new Map()
  : {
      get: () => undefined,
      set: () => undefined
    }
export const group = (fn, groups = cache) => {
  return (...args) => {
    const key = JSON.stringify(args)
    const existing = groups.get(key)
    if (existing) {
      return existing
    }
    const result = fn(...args)
    groups.set(key, result)
    return result
  }
}
export const makeConfig = token => ({
  headers: {
    accept: '*/*',
    ...(token ? { authorization: `Bearer ${token}` } : {}),
    'content-type': 'application/json',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'cross-site'
  },
  mode: 'cors'
})

const later = (time, args) => {
  // if (process.browser) {
  if (args[0].includes('error')) {
    console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
    args[0] = args[0] + '&filter=causes_error'
  }
  return new Promise(r => setTimeout(() => r(args), time))
}
const fetchJson = (...args) =>
  //@todo remove delay
  later(20, args)
    .then(args => fetch(...args))
    .then(result => result.json())
    .then(result => {
      if (result.errors) {
        throw result.errors[0].message
      }
      return result
    })
const groupFetchJson = group(fetchJson, cache)

export const getProducts = (query, getState, dispatch) => {
  return dispatch(loadCategories()).then(() => {
    const categories = selectCategoriesData(getState())
    const { category, ...queryCopy } = query //copy query to prevent mutating
    const cat = Object.values(categories).find(
      c => get(c, ['slug', LANGUAGE], {}) === category
    )
    if (cat) {
      queryCopy.category = cat.id
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
