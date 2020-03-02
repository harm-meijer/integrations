import React, {useMemo} from 'react'
import {
  selectQuery,
  selectProductsList,
  useResults as guardResults
} from '../store/selectors'
import {useSelector} from 'react-redux'
import {useProducts} from '../hooks'
import HtmlDiv from './HtmlDiv'
import Screenshots from './Screenshots'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import withResult from './withResult'
import {Text} from '@commercetools-frontend/ui-kit';
import IntegrationBadges from "./IntegrationBadges";
import IntegrationDeveloper from "./IntegrationDeveloper";


const ProductDetail = ({product}) => (
  <div className="vendor-details">
    <Row className="row">
      <Col sm={12}>
        <Text.Headline as="h1">
          {"About " + product.name}
        </Text.Headline>
      </Col>
    </Row>
    <Row className="row">
      <Col sm={9}>
        <HtmlDiv
          content={product.description}
          className="description"
        />
      </Col>
      <Col sm={3}>
        {product.logo && (
          <img src={product.logo} className="vendor-logo"/>
        )}
        <Row>
          <IntegrationBadges product={product} title="Part of"/>
        </Row>
      </Col>
    </Row>
    <Row>
      <Col sm={9}>
        <Text.Headline as="h2">
          Description of the Integration
        </Text.Headline>
      </Col>
    </Row>
    <Row>
      {/*Should be conditional in case no developer set*/}
      <Col sm={9}>
        <HtmlDiv
          content={product.Description}
          className="integration-description"
        />
      </Col>
      <Col sm={3}>
        <IntegrationDeveloper product={product}/>
      </Col>
    </Row>
    <Row>
      <Screenshots product={product}/>
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
    return ResultComponent({...result.value, ...result})
  }, [productResult])
}
