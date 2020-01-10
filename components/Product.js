import React from 'react'
import Link from 'next/link'

const Product = ({ logo, ShortDescription, slug }) => (
  <Link
    href={`/integration?slug=${slug}`}
    as={`/integration/${slug}`}
  >
    <div style={{ cursor: 'pointer' }}>
      <img src={logo} style={{ width: '100%' }} />
      <div>{ShortDescription}</div>
    </div>
  </Link>
)

export default Product
