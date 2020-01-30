import React, { useMemo } from 'react'
import {
  selectQuery,
  selectProductsList
} from '../store/selectors'
import { useSelector } from 'react-redux'
import { useProducts } from '../hooks'
import { Container, Row, Col } from 'react-bootstrap'
import HtmlDiv from './HtmlDiv'
import Links from './Links'
import IntegrationTypes from './IntegrationTypes'

const ProductDetail = ({ product }) => (
  <div>
    <Container className="integration">
      <Row>
        <Col sm={3} className="vendor-details">
          {product.logo && (
            <div className="vendor-logo">
              <img
                src={product.logo}
                className="vendor-image"
              />
            </div>
          )}
          <div>
            <div className="title">Integration Name:</div>
            <div>{product.name}</div>
          </div>
          <IntegrationTypes product={product} />
        </Col>
        <Col sm={9} className="vendor-details">
          <h1 className="integration-header">
            Why this solution is a great addition to
            commercetools
          </h1>
          <HtmlDiv
            content={product.ShortDescription}
            className="description"
          />
          <h1 className="integration-header">
            Description of the Integration
          </h1>
          <HtmlDiv
            content={product.Description}
            className="description"
          />
          <h1 className="integration-header">
            Screenshots and Videos
          </h1>
          <p>Cannot do this yet, cannot use data as is</p>
          <Links product={product} />
        </Col>
      </Row>
    </Container>
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
