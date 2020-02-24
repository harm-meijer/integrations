import React, {memo} from 'react'
import {Row, Col} from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar'
import Link from 'next/link'

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <Row>
        <Col>
          <img src="/commercetools-logo-horiz.png" className='logo'/>
        </Col>
        <Col>
          <span className="text-muted">Place sticky footer content here.</span>
        </Col>
        </Row>
      </div>
    </footer>
  )
}

export default memo(Footer)
