import {
  getProducts,
  getCategories
} from '../commercetools-api/client'
import {
  selectCategories,
  selectProductPage,
  useResults
} from './selectors'

export const PRODUCTS_LOADING = 'PRODUCTS_LOADING'
export const PRODUCTS_LOADING_ERROR =
  'PRODUCTS_LOADING_ERROR'
export const PRODUCTS_LOADING_SUCCEEDED =
  'PRODUCTS_LOADING_SUCCEEDED'
export const CATEGORIES_LOADING = 'CATEGORIES_LOADING'
export const CATEGORIES_LOADING_ERROR =
  'CATEGORIES_LOADING_ERROR'
export const CATEGORIES_LOADING_SUCCEEDED =
  'CATEGORIES_LOADING_SUCCEEDED'
export const SET_QUERY = 'SET_QUERY'
export const SET_PAGE_LOADING = 'SET_PAGE_LOADING'

export const loadProducts = query => (
  dispatch,
  getState
) => {
  const { value } = useResults([
    selectProductPage(getState(), query)
  ])(() => true)
  if (value && process.browser) {
    //data is already here, do not request again
    return Promise.resolve()
  }
  dispatch({ type: PRODUCTS_LOADING, payload: query })
  return getProducts(query, getState, dispatch)
    .then(({ results, total, limit }) => {
      return dispatch({
        type: PRODUCTS_LOADING_SUCCEEDED,
        payload: {
          results,
          query,
          total: Math.ceil(total / limit)
        }
      })
    })
    .catch(error =>
      //@ todo try with a result from server that is above 399
      //  it should have json and use the error in the json instaed
      dispatch({
        type: PRODUCTS_LOADING_ERROR,
        payload: { error, query }
      })
    )
}
export const loadCategories = () => (
  dispatch,
  getState
) => {
  const categories = selectCategories(getState())
  if (!categories.loading && categories.requested) {
    return Promise.resolve()
  }
  dispatch({ type: CATEGORIES_LOADING })
  return getCategories().then(response => {
    dispatch({
      type: CATEGORIES_LOADING_SUCCEEDED,
      payload: response.results
    })
  })
}
export const setQuery = query => ({
  type: SET_QUERY,
  payload: query
})
export const setPageLoading = (loading = false) => ({
  type: SET_PAGE_LOADING,
  payload: loading
})
