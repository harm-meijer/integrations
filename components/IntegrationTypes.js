import React, { useMemo } from 'react'

const IntegrationTypes = ({ types }) => (
  <div>
    <div className="title">Integration Type:</div>
    {types.map(type => (
      <div key={type}>{type}</div>
    ))}
  </div>
)
export default function IntegrationTypesContainer({
  product
}) {
  return useMemo(() => {
    const types = !product
      ? []
      : [...product.categories]
          .map(c => c.name)
          .sort((a, b) => a.localeCompare(b))
    return types.length ? IntegrationTypes({ types }) : ''
  }, [product])
}
