import React, { useMemo } from 'react'

const IndexHeader = () => (
  <div className="integration">
    <h1 className="big-title">
      commercetools Integration Marketplace
    </h1>
    <h1 className="integration-header">
      Browse official third party integration extensions
    </h1>
  </div>
)
export default function IndexHeaderHeaderContainer() {
  return useMemo(() => IndexHeader(), [])
}
