const fetch = require('isomorphic-unfetch')
require('dotenv').config()

const PROJECT_KEY = process.env.PROJECT_KEY
const CLIENT_SECRET = process.env.CLIENT_SECRET
const CLIENT_ID = process.env.CLIENT_ID
const AUTH_URL = process.env.AUTH_URL
const API_URL = process.env.API_URL
const SCOPES = process.env.SCOPES

console.log('Using config:')
console.log(
  JSON.stringify(
    {
      PROJECT_KEY,
      CLIENT_SECRET,
      CLIENT_ID,
      AUTH_URL,
      API_URL,
      SCOPES,
      NODE_ENV: process.env.NODE_ENV
    },
    undefined,
    2
  )
)
const makeConfig = token => ({
  headers: {
    accept: '*/*',
    ...(token ? { authorization: `Bearer ${token}` } : {}),
    'content-type': 'application/json',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'cross-site'
  },
  mode: 'cors'
})
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
          .then(
            token => {
              storage.setItem(
                'token',
                JSON.stringify(token)
              )
              return token
            },
            err =>
              console.log('error:', err) ||
              Promise.reject(err)
          )
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
const getProducts = withToken((query, { access_token }) => {
  const url = toUrl(
    `${API_URL}/${PROJECT_KEY}/product-projections/search`,
    query
  )
  return fetchJson(url, makeConfig(access_token))
})

const getCategories = withToken(
  (query, { access_token }) => {
    const url = toUrl(
      `${API_URL}/${PROJECT_KEY}/categories`,
      query
    )
    return fetchJson(url, makeConfig(access_token))
  }
)
module.exports = {
  getCategories,
  getProducts
}
