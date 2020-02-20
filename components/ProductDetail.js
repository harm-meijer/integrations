import React, { useMemo } from 'react'
import {
  selectQuery,
  selectProductsList,
  useResults as guardResults
} from '../store/selectors'
import { useSelector } from 'react-redux'
import { useProducts } from '../hooks'
import HtmlDiv from './HtmlDiv'
import Screenshots from './Screenshots'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import withResult from './withResult'
import Card from "react-bootstrap/Card";

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
          <img src={product.logo} className="vendor-logo" />
        )}
      </Col>
    </Row>
    <Row>
      {/*Iterate over the USPs*/}
      {
        [1,2,3].map((i) => (
          <Col sm={4} key={i}>
            <Card>
              <Card.Body>
                <Card.Title>USP #{i}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">This is why</Card.Subtitle>
                <Card.Text>
                  Some quick example text to build on the card title and make up the bulk of
                  the card's content.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))
      }
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
const ResultComponent = withResult(ProductDetail)
export default function ProductDetailContainer() {
  const query = useSelector(selectQuery)
  useProducts(query)
  const productResult = useSelector(state =>
    selectProductsList(state, query)
  )
  return useMemo(() => {
    const result = guardResults([productResult])(([p]) => ({
      product: p[0]
    }))
    return ResultComponent({ ...result.value, ...result })
  }, [productResult])
}
