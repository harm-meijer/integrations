import React from 'react'
import Link from 'next/link'
import Row from "react-bootstrap/Row";

const Product = ({ logo, ShortDescription, slug, Vendor, name }) => (
  <Link
    href={`/integration?slug=${slug}`}
    as={`/integration/${slug}`}
  >
    <div className="product-list-item">
      <Row>
      <img src={logo} className="vendor-logo"/>
      </Row>
      <Row>
      <small>{Vendor}</small>
      </Row>
      <hr/>
      <Row>
      <big>{name}</big>
      </Row>
      <Row>
      <div>{ShortDescription}</div>
      </Row>
    </div>
  </Link>
)

export default Product
