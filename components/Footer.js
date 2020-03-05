import React, {memo} from 'react'
import {Row, Col} from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar'
import {Grid, ExternalLinkIcon, Link} from '@commercetools-frontend/ui-kit';

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <Grid gridGap="16px"
              gridAutoColumns="1fr"
              gridTemplateColumns={'3fr 2fr 100px 100px 100px 1fr'}>
          <Grid.Item>
            <img src="/commercetools_logo.svg" className='logo'/>
          </Grid.Item>
          <Grid.Item>
              Copyright © 2020 commercetools
          </Grid.Item>
          <Grid.Item style={{textAlign:'center'}}>
              <Link to="https://ok.commercetools.com/contact-us" isExternal={true} className="footer-link">
                Contact Us <ExternalLinkIcon style={{width: '12px'}}/>
              </Link>
          </Grid.Item>
          <Grid.Item style={{textAlign:'center'}}>
            <Link to="https://commercetools.com/privacy" isExternal={true} className="footer-link">
              Privacy Policy <ExternalLinkIcon style={{width: '12px'}} />
            </Link>
          </Grid.Item>
          <Grid.Item style={{textAlign:'center'}}>
            <Link to="https://commercetools.com/imprint" isExternal={true} className="footer-link">
              Imprint <ExternalLinkIcon style={{width: '12px'}} />
            </Link>
          </Grid.Item>
        </Grid>


      </div>
    </footer>
  )
}

export default memo(Footer)
