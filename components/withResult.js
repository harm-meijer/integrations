import React from 'react'
const standardLoading = () => <div>Loading...</div>
const standardError = error => <div>Error...{error}</div>
//because of getInitialProps loading will never be true
//  keep this if the project moves from next
const withResult = (
  component,
  loading = standardLoading,
  error = standardError
) => withLoading(withError(component, error), loading)

export const withLoading = (
  component,
  loadingComponent = standardLoading
) => ({ loading, requested, ...props }) =>
  !loading && requested
    ? component(props)
    : loadingComponent()

export const withError = (
  component,
  ErrorComponent = standardError
) => ({ error, ...props }) =>
  !error ? component(props) : ErrorComponent(error)

export default withResult
