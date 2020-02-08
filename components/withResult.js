import React from 'react'
const withResult = component => ({
  loading,
  requested,
  ...props
}) =>
  //@todo: implement error as well
  !loading && requested ? (
    component(props)
  ) : (
    <div>Loading...</div>
  )
export default withResult
