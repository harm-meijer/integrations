import '../style.scss'
import '../LightBox.scss'
import React from 'react'
import { Provider } from 'react-redux'
import App from 'next/app'
import withRedux from 'next-redux-wrapper'
import { initStore, STORE_KEY } from '../store/initStore.js'
import { setQuery, setPageLoading } from '../store/actions'
import { withPage } from '../helpers'

export default withRedux(initStore, {
  storeKey: STORE_KEY
})(
  class MyApp extends App {
    state = {}
    static async getInitialProps({ Component, ctx }) {
      ctx.store.dispatch(setPageLoading(true))
      return {
        pageProps: Component.getInitialProps
          ? await Component.getInitialProps({
              ...ctx,
              query: withPage(ctx.query)
            }).then(props => {
              ctx.store.dispatch(setPageLoading(false))
              return props
            })
          : {}
      }
    }
    static getDerivedStateFromProps(props) {
      props.store.dispatch(setQuery(props.pageProps.query))
      return null
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
