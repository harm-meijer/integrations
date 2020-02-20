import React from 'react'
import Link from 'next/link'
import Row from 'react-bootstrap/Row'

import {Card, Text, Grid} from '@commercetools-frontend/ui-kit';

const Product = ({
                   logo,
                   ShortDescription,
                   slug,
                   Vendor,
                   name
                 }) => (

    <Card theme="light" type="raised">
          <div className="image-row" style={{height: '100px', paddingLeft: '10px'}}>
            <div>
              <img src={logo} className="vendor-logo"/>
            </div>
          </div>
          <div style={{height: '100px', paddingLeft: '10px', overflow: 'hidden'}}>
            <Link href={`/integration?slug=${slug}`} as={`/integration/${slug}`}>
              <Text.Headline as="h4">{name}</Text.Headline>
            </Link>
          </div>
          <div style={{
            height: '100px',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            paddingLeft: '10px'
          }}>
            <Text.Wrap>{ShortDescription}</Text.Wrap>
          </div>
          <hr/>
          <div style={{height: '30px', paddingLeft: '10px'}}>
            <Text.Detail tone={'primary'}>{Vendor}</Text.Detail>
          </div>
    </Card>
)

export default Product
