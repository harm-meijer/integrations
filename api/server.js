import fetch from 'isomorphic-unfetch'
import secret from '../secret'
import { group, makeConfig } from './shared'

const PROJECT_KEY = secret.PROJECT_KEY
const CLIENT_ID = secret.CLIENT_ID
const CLIENT_SECRET = secret.CLIENT_SECRET
const AUTH_URL = secret.AUTH_URL
const API_URL = secret.API_URL
const SCOPES = secret.SCOPES

console.log('Using config:')
console.log(
  JSON.stringify(
    {
      ...secret,
      NODE_ENV: process.env.NODE_ENV
    },
    undefined,
    2
  )
)

const toUrl = (base, query) => {
  const queryParams = Object.entries(query)
  return (
    base +
    (queryParams.length ? '?' : '') +
    queryParams
      .reduce((q, [key, value]) => {
        q.set(key, value)
        return q
      }, new URLSearchParams())
      .toString()
  )
}

const fetchJson = (...args) =>
  fetch(...args).then(result => {
    if (result.status === 401) {
      throw { statusCode: 401 }
    }
    return result.json()
  })
global.cache = new Map()
const groupFetchJson = group(fetchJson, global.cache)
const base64 = string =>
  Buffer.from(string).toString('base64')
const createStorage = storage => {
  if (global.token) {
    storage.set('token', global.token)
  }
  return {
    getItem: key => {
      const result = storage.get(key)
      return result === undefined ? null : result
    },
    setItem: (key, value) => {
      global.token = value
      storage.set(key, value)
      return value
    }
  }
}
const storage = createStorage(new Map())
const getToken = (refresh = false) => {
  const storageToken = storage.getItem('token')
  return storageToken && !refresh
    ? Promise.resolve(JSON.parse(storageToken))
    : console.log('fetching token') ||
        fetch(
          `${AUTH_URL}/oauth/${PROJECT_KEY}/anonymous/token`,
          {
            headers: {
              accept: '*/*',
              authorization: `Basic ${base64(
                `${CLIENT_ID}:${CLIENT_SECRET}`
              )}`,
              'content-type':
                'application/x-www-form-urlencoded',
              'sec-fetch-mode': 'cors',
              'sec-fetch-site': 'cross-site'
            },
            body: `grant_type=client_credentials&scope=${SCOPES}`,
            method: 'POST',
            mode: 'cors'
          }
        )
          .then(r => r.json())
          .then(token => {
            storage.setItem('token', JSON.stringify(token))
            return token
          })
}

const withToken = (() => {
  let token = getToken()
  let tries = 0
  return fn => {
    const doRequest = (...args) =>
      token
        .then(token => fn(...args.concat(token)))
        .catch(err => {
          tries = tries + 1
          if (err.statusCode === 401 && tries < 3) {
            token = getToken(true)
            return doRequest(...args)
          }
          throw err
        })
    return doRequest
  }
})()
export const getProducts = withToken(
  (query, { access_token }) => {
    const url = toUrl(
      `${API_URL}/${PROJECT_KEY}/product-projections/search`,
      query
    )
    return groupFetchJson(url, makeConfig(access_token))
  }
)

export const getCategories = withToken(
  (query, { access_token }) => {
    const url = toUrl(
      `${API_URL}/${PROJECT_KEY}/categories`,
      query
    )
    return groupFetchJson(url, makeConfig(access_token))
  }
)
