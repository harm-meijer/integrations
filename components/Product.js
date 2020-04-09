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

  <Card theme="light" type="raised">
    <Link href={`/integration?slug=${slug}`} as={`/integration/${slug}`}>
      <div className="image-row">
        <div style={{backgroundImage: 'url(' + logo + ')'}}
             className="vendor-logo"></div>
      </div>
    </Link>

    <Link href={`/integration?slug=${slug}`} as={`/integration/${slug}`}>
      <div style={{height: '100px', overflow: 'hidden'}} className="line-clamp">
        {ShortDescription}
      </div>
    </Link>
    <hr/>
    <Link href={`/integration?slug=${slug}`} as={`/integration/${slug}`}>
      <div style={{height: '30px', paddingLeft: '10px'}}>
        <Text.Detail tone={'primary'}>{Vendor}</Text.Detail>
      </div>
    </Link>
  </Card>
)

export default Product
