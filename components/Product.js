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
    <div
      className="image-row"
      style={{ height: '75px', paddingLeft: '10px' }}
    >
      <div>
        <Link
          href={`/integration?slug=${slug}`}
          as={`/integration/${slug}`}
        >
          <img src={logo} className="vendor-logo" />
        </Link>
      </div>
    </div>
    <Link
      href={`/integration?slug=${slug}`}
      as={`/integration/${slug}`}
    >
      <div
        style={{ height: '100px', overflow: 'hidden' }}
        className="line-clamp"
      >
        {ShortDescription}
      </div>
    </Link>
    <hr />
    <div style={{ height: '30px', paddingLeft: '10px' }}>
      <Link
        href={`/integration?slug=${slug}`}
        as={`/integration/${slug}`}
      >
        <Text.Detail tone={'primary'}>{Vendor}</Text.Detail>
      </Link>
    </div>
  </Card>
)

export default Product
