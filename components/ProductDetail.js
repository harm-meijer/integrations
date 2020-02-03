import React, { useMemo } from 'react'
import {
  selectQuery,
  selectProductsList
} from '../store/selectors'
import { useSelector } from 'react-redux'
import { useProducts } from '../hooks'
import HtmlDiv from './HtmlDiv'

const ProductDetail = ({ product }) => (
  <div className="vendor-details">
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
    {product.screenshots.length > 0 && (
      <div>
        <h1 className="integration-header">
          Screenshots and Videos
        </h1>
        {product.screenshots.map(href => (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            key={href}
          >
            <img className="vendor-image" src={href} />
          </a>
        ))}
      </div>
    )}
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
