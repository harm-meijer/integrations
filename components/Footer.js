import React, {memo} from 'react'
import {Row, Col} from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar'
import Link from 'next/link'
import {Grid, ExternalLinkIcon} from '@commercetools-frontend/ui-kit';

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <Grid gridGap="16px"
              gridAutoColumns="1fr"
              gridTemplateColumns={'3fr 2fr 1fr 1fr 1fr'}>
          <Grid.Item>
            <img src="/commercetools-logo-horiz.png" className='logo'/>
          </Grid.Item>
          <Grid.Item>
            <b>
              Copyright © 2020 commercetools
            </b>
          </Grid.Item>
          <Grid.Item>
            <b>
             Contact Us <ExternalLinkIcon /> |
            </b>
          </Grid.Item>
          <Grid.Item>
            Privacy Policy <ExternalLinkIcon /> |
          </Grid.Item>
          <Grid.Item>
            Imprint <ExternalLinkIcon /> |
          </Grid.Item>
        </Grid>


      </div>
    </footer>
  )
}

export default memo(Footer)
