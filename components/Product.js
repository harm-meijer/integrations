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
          <div className="image-row" style={{height: '75px', paddingLeft: '10px'}}>
            <div>
              <img src={logo} className="vendor-logo"/>
            </div>
          </div>
          <hr/>
          <div style={{height:'100px', overflow: 'hidden'}} className="line-clamp">

            {ShortDescription}

          </div>
          <hr/>
          <div style={{height: '30px', paddingLeft: '10px'}}>
            <Text.Detail tone={'primary'}>{Vendor}</Text.Detail>
          </div>
    </Card>
)

export default Product
