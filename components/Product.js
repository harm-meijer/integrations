import React from 'react'
import Link from 'next/link'

const Product = ({ logo, ShortDescription, slug }) => (
  <Link
    href={`/integration?slug=${slug}`}
    as={`/integration/${slug}`}
  >
    <div className="product-list-item">
      <img src={logo} />
      <div>{ShortDescription}</div>
    </div>
  </Link>
)

export default Product
