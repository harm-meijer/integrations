import {
  selectCategoriesRequested,
  selectProductsRequested
} from './store/selectors'
import {
  loadProducts,
  loadCategories
} from './store/actions'
import { useDispatch, useSelector } from 'react-redux'

export const getIfMissing = (
  dispatch,
  query,
  requested,
  loader
) => {
  if (!requested && process.browser) {
    dispatch(loader(query))
  }
}
const useForHasData = selector => {
  const dispatch = useDispatch()
  const requested = useSelector(selector)
  return { dispatch, requested }
}
export const useProducts = query => {
  const { dispatch, requested } = useForHasData(state =>
    selectProductsRequested(state, query)
  )
  getIfMissing(dispatch, query, requested, loadProducts)
}
export const useCategories = query => {
  const { dispatch, requested } = useForHasData(
    selectCategoriesRequested
  )
  getIfMissing(dispatch, query, requested, loadCategories)
}
