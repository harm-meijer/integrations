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
    <Row>
      <Col sm={9} style={{paddingRight: '40px'}}>
        <Row>
          <Text.Headline as="h1">
            {"About " + product.name}
          </Text.Headline>
        </Row>
        <Row>
          <HtmlDiv
            content={product.description}
            className="description"
          />
        </Row>
        <Row>
          <Text.Headline as="h2">
            Description of the Integration
          </Text.Headline>
        </Row>
        <Row>
          <HtmlDiv
            content={product.Description}
            className="integration-description"
          />
        </Row>
        <Row>
          <Screenshots product={product} title="Screenshots"/>
        </Row>
      </Col>
      <Col sm={3}>
        <Row style={{paddingLeft: '10px'}}>
          {product.logo && (
            <img src={product.logo} className="vendor-logo"/>
          )}
        </Row>
        <Row style={{paddingLeft: '10px'}}>
          <IntegrationBadges product={product} title="Integration Type"/>
        </Row>
        <Row style={{paddingLeft: '10px'}}>
          <IntegrationDeveloper product={product} title="Developed By"/>
        </Row>
      </Col>
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
