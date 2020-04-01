import React, { useEffect } from 'react'
import Head from 'next/head'
import Menu from './Menu'
import Search from './Search'
import Header from './Header'
import Container from 'react-bootstrap/Container'
import { useSelector } from 'react-redux'
import SubHeader from './SubHeader'
import { LoadingSpinner } from '@commercetools-frontend/ui-kit'
import Footer from './Footer'
import ReactGA from 'react-ga'

ReactGA.initialize('UA-159551406-1', {
  alwaysSendToDefaultTracker: true
})

const trackPage = page => {
  ReactGA.set({
    page
  })
  ReactGA.pageview(page)
}
function Layout({ SubHeader, ...props }) {
  const page = process.browser
    ? window.location.pathname
    : false
  useEffect(() => {
    if (page) {
      trackPage(page)
    }
  }, [page])

  return (
    <React.Fragment>
      <Head>
        <title>{props.title}</title>
        <meta
          name="keywords"
          content={props.metaKeywords}
        ></meta>
        <meta
          name="description"
          content={props.metaDescription}
        ></meta>
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
          integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css?family=Open+Sans|Roboto&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.png" type="image/png" sizes="16x16"/>
      </Head>
      <SubHeader />
      <Container
        style={{ position: 'relative', zIndex: '1' }}
      >
        <Header Menu={Menu} Search={Search} />
      </Container>
      <Container className="content">
        {props.loading ? (
          <div style={{ height: '100vh' }}>
            <LoadingSpinner scale="l">
              Loading...
            </LoadingSpinner>
          </div>
        ) : (
          <div id="content">{props.children}</div>
        )}
      </Container>
      <Footer />
      {process.env.NODE_ENV === 'production' &&
        <React.Fragment>
          <script
            type="text/javascript"
            src="https://cdn.cookielaw.org/consent/b104027d-4d10-4b75-9675-9ffef11562a8/OtAutoBlock.js"
          ></script>
          <script
            type="text/javascript"
            src="https://cdn.cookielaw.org/scripttemplates/otSDKStub.js"
            charSet="UTF-8"
            data-domain-script="b104027d-4d10-4b75-9675-9ffef11562a8"
          ></script>
          <script type="text/javascript">
            function OptanonWrapper() {}
          </script> 
        </React.Fragment>     
      }
    </React.Fragment>
  )
}
export default function LayoutContainer(props) {
  const loading = useSelector(s => s.loading)
  return Layout({
    ...props,
    loading,
    SubHeader: props.SubHeader || SubHeader
  })
}
