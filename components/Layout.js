import React from 'react'
import Head from 'next/head'
import Menu from './Menu'
import Search from './Search'
import Header from './Header'
export default function Layout(props) {
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
      </Head>
      <Header
        Menu={Menu}
        Search={Search}
        SubHeader={props.header}
      />
      <div id="content">{props.children}</div>
    </React.Fragment>
  )
}
