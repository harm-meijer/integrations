import React from 'react'
const standardLoading = () => <div>Loading...</div>
//because of getInitialProps loading will never be true
//  keep this if the project moves from next
const withResult = (
  component,
  loadingComponent = standardLoading
) => ({ loading, requested, ...props }) =>
  //@todo: implement error by combining withLoading and withError
  !loading && requested
    ? component(props)
    : loadingComponent()
export default withResult
