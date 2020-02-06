import React, { useMemo } from 'react'
import {
  selectQuery,
  selectProductsList
} from '../store/selectors'
import { useSelector } from 'react-redux'
import { useProducts } from '../hooks'
import HtmlDiv from './HtmlDiv'
import Screenshots from './Screenshots'
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const ProductDetail = ({ product }) => (
  <div className="vendor-details">
      <Row>
        <Col sm={12}>
          <h1 className="integration-header">
            About {product.name}
          </h1>
        </Col>
      </Row>
      <Row>
        <Col sm={9}>
          <HtmlDiv
            content={product.description}
            className="description"
          />
        </Col>
        <Col sm={3}>
          {product.logo && (
              <img
                src={product.logo}
                className="vendor-logo"
              />
          )}
        </Col>
      </Row>
      <Row>
        <Col sm={12}>
          <h1 className="integration-header">
            Description of the Integration
          </h1>
        </Col>
      </Row>
      <Row>
        <Col sm={12}>
          <HtmlDiv
            content={product.Description}
            className="description"
          />
        </Col>
      </Row>
      <Row>
        <Screenshots product={product} />
      </Row>
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
