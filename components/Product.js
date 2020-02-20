import React from 'react'
import Link from 'next/link'
import Row from 'react-bootstrap/Row'

import {Card, Text} from '@commercetools-frontend/ui-kit';

const Product = ({
                   logo,
                   ShortDescription,
                   slug,
                   Vendor,
                   name
                 }) => (
  <Link
    href={`/integration?slug=${slug}`}
    as={`/integration/${slug}`}
  >
    <Card theme="light" type="raised" style={{height: '350px', margin: '10px'}}>
      {/*<div className="product-list-item">*/}
        <Row className="image-row" style={{height: '75px', paddingLeft: '10px'}}>
          <div>
            <img src={logo} className="vendor-logo"/>
          </div>
        </Row>
        <Row style={{height: '75px', paddingLeft: '10px', overflow: 'hidden'}}>
          <Text.Headline as="h4">{name}</Text.Headline>
        </Row>
        <Row style={{height: '100px', textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden',  paddingLeft: '10px'}}>
          <Text.Wrap>{ShortDescription}</Text.Wrap>
        </Row>
        <hr/>
        <Row style={{height: '30px',  paddingLeft: '10px'}} >
          <Text.Detail tone={'primary'}>{Vendor}</Text.Detail>
        </Row>
      {/*</div>*/}
    </Card>
  </Link>
)

export default Product
