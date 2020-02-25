import React from 'react'
import Link from 'next/link'
import {
  Card,
  Text,
  Grid
} from '@commercetools-frontend/ui-kit'

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
    <Card theme="light" type="raised">
      <div
        className="image-row"
        style={{height: '75px'}}
      >

        <div style={{background: 'url(' + logo + ') no-repeat center', height: '75px', backgroundSize: 'contain'}}
             className="vendor-logo"></div>

      </div>

      <div
        style={{height: '100px', overflow: 'hidden'}}
        className="line-clamp"
      >
        {ShortDescription}
      </div>
      <hr/>
      <div style={{height: '30px', paddingLeft: '10px'}}>

        <Text.Detail tone={'primary'}>{Vendor}</Text.Detail>

      </div>
    </Card>
  </Link>
)

export default Product
