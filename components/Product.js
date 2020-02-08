import React from 'react'
import Link from 'next/link'
import Row from 'react-bootstrap/Row'

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
    <div className="product-list-item">
      <Row className="image-row">
        <div>
          <img src={logo} className="vendor-logo" />
        </div>
      </Row>
      <Row>
        <small>{Vendor}</small>
      </Row>
      <hr />
      <Row className="title-row">
        <h2>{name}</h2>
      </Row>
      <Row>
        <div>{ShortDescription}</div>
      </Row>
    </div>
  </Link>
)

export default Product
