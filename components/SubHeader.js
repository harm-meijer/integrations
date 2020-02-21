import React, { useMemo } from 'react'

const IndexHeader = () => (
  <div className="integration" style={{paddingTop: '100px'}}>
    <h1>
      commercetools Integration Marketplace
    </h1>
    <h2>
      Browse official third party integration extensions
    </h2>
  </div>
)
export default function IndexHeaderHeaderContainer() {
  return useMemo(() => IndexHeader(), [])
}
