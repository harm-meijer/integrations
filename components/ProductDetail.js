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
import {Text} from '@commercetools-frontend/ui-kit';


const ProductDetail = ({ product }) => (
  <div className="vendor-details">
    <Row>
      <Col sm={12}>
        <Text.Headline as="h1">
          {"About " + product.name}
        </Text.Headline>
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
