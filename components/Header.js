import React, { memo } from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Link from 'next/link'
function Header({ Menu, Search, SubHeader = () => '' }) {
  return (
    <header className="header">
      <Navbar expand="sm">
        <Navbar.Brand>
          <Link href="/">
            <img
              className="logo"
              src="https://commercetools.com/wp-content/uploads/2018/06/logo.png"
              title="Home"
            />
          </Link>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Menu />
          <Search />
        </Navbar.Collapse>
      </Navbar>
    </header>
  )
}
export default memo(Header)
