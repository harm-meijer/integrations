import React, { useMemo } from 'react'
import {
  selectQuery,
  selectProductsList
} from '../store/selectors'
import { useSelector } from 'react-redux'
import { useProducts } from '../hooks'
import HtmlDiv from './HtmlDiv'
import Screenshots from './Screenshots'

const ProductDetail = ({ product }) => (
  <div className="vendor-details">
    <img
      src={product.logo}
      className="vendor-logo"
      align="right"
    />
    <h1 className="integration-header">
      About the product
    </h1>
    <HtmlDiv
      content={product.description}
      className="description"
    />
    <h1 className="integration-header">
      Description of the Integration
    </h1>
    <HtmlDiv
      content={product.Description}
      className="description"
    />
    <Screenshots product={product} />
  </div>
)
export default function ProductDetailContainer() {
  const query = useSelector(selectQuery)
  useProducts(query)
  const product = useSelector(state =>
    selectProductsList(state, query)
  )[0]

  return useMemo(
    () => (product ? ProductDetail({ product }) : ''),
    [product]
  )
}
