import React, { useMemo } from 'react'
import {
  selectQuery,
  selectProductsList
} from '../store/selectors'
import { useSelector } from 'react-redux'
import { useProducts } from '../hooks'
import Links from './Links'

const ProductDetailHeader = product => (
  <div className="integration">
    <h1 className="big-title">{product.name}</h1>
    <h1 className="integration-header">
      {product.ShortDescription}
    </h1>
    <Links product={product} />
  </div>
)
export default function ProductDetailHeaderContainer() {
  const query = useSelector(selectQuery)
  useProducts(query)
  const product = useSelector(state =>
    selectProductsList(state, query)
  )[0]

  return useMemo(
    () => (product ? ProductDetailHeader(product) : ''),
    [product]
  )
}
