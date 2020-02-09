import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import {
  PRODUCTS_LOADING,
  CATEGORIES_LOADING,
  PRODUCTS_LOADING_SUCCEEDED,
  CATEGORIES_LOADING_SUCCEEDED,
  SET_QUERY,
  SET_PAGE_LOADING,
  PRODUCTS_LOADING_ERROR
} from './actions'
import { queryAsKey } from '../helpers'

const initState = {
  products: {
    data: {}
  },
  categories: {
    requested: false,
    data: {}
  },
  query: {},
  loading: false
}
const reduceById = (items, item) => {
  items[item.id] = item
  return items
}

const rootReducer = (state = initState, action) => {
  const { type, payload } = action
  if (type === SET_PAGE_LOADING) {
    return { ...state, loading: payload }
  }
  if (type === SET_QUERY) {
    return { ...state, query: payload }
  }
  if (type === PRODUCTS_LOADING) {
    const { page, ...query } = payload
    const key = queryAsKey(query)
    return {
      ...state,
      products: {
        ...state.products,
        [key]: {
          ...state.products[key],
          [page]: {
            requested: true,
            loading: true
          }
        }
      }
    }
  }
  if (type === CATEGORIES_LOADING) {
    return {
      ...state,
      categories: {
        ...state.categories,
        requested: true,
        loading: true
      }
    }
  }
  if (type === PRODUCTS_LOADING_SUCCEEDED) {
    const { page, ...query } = payload.query
    const { results, total } = payload
    const key = queryAsKey(query)
    return {
      ...state,
      products: {
        ...state.products,
        data: results.reduce(
          reduceById,
          state.products.data
        ),
        [key]: {
          ...state.products[key],
          [page]: {
            value: { total, ids: results.map(r => r.id) },
            loading: false,
            requested: true
          }
        }
      }
    }
  }
  //@todo add reduePath, make code shorter
  if (type === PRODUCTS_LOADING_ERROR) {
    const {
      error,
      query: { page, ...query }
    } = payload
    const key = queryAsKey(query)
    return {
      ...state,
      products: {
        ...state.products,
        [key]: {
          ...state.products[key],
          [page]: {
            loading: false,
            requested: true,
            error
          }
        }
      }
    }
  }
  if (type === CATEGORIES_LOADING_SUCCEEDED) {
    return {
      ...state,
      categories: {
        ...state.categories,
        data: payload.reduce(reduceById, {
          ...state.categories.data
        }),
        loading: false
      }
    }
  }
  return state
}

export const initStore = (initialState = initState) => {
  return createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
  )
}
export const STORE_KEY = '__NEXT_REDUX_STORE__'
