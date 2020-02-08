import React from 'react'
const standardLoading = () => <div>Loading...</div>
const withResult = (
  component,
  loadingComponent = standardLoading
) => ({ loading, requested, ...props }) =>
  //@todo: implement error as well
  !loading && requested
    ? component(props)
    : loadingComponent()
export default withResult
