import '../style.scss'
import '../LightBox.scss'
import React from 'react'
import { Provider } from 'react-redux'
import App from 'next/app'
import withRedux from 'next-redux-wrapper'
import { initStore, STORE_KEY } from '../store/initStore.js'
import { setQuery } from '../store/actions'
import { withPage } from '../helpers'

export default withRedux(initStore, {
  storeKey: STORE_KEY
})(
  class MyApp extends App {
    static async getInitialProps({ Component, ctx }) {
      ctx.store.dispatch(setQuery(withPage(ctx.query)))
      return {
        pageProps: Component.getInitialProps
          ? await Component.getInitialProps(ctx)
          : {}
      }
    }

    render() {
      const { Component, pageProps, store } = this.props
      return (
        <div>
          <Provider store={store}>
            <Component {...pageProps} />
          </Provider>
        </div>
      )
    }
  }
)
