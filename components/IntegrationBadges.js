import React, {useMemo} from 'react'
import {Badge} from 'react-bootstrap';

const IntegrationBadges = ({types}) => (
  <div>
    {types.map(type => (
      <Badge variant="light" key={type} style={{marginRight: '5px'}}>{type}</Badge>
    ))}
  </div>
)
export default function IntegrationBadgesContainer({
                                                    product
                                                  }) {
  return useMemo(() => {
    const types = !product
      ? []
      : [...product.categories]
        .map(c => {
          if (c.parent) {
              return c.name
            }
          }
        )
        .sort((a, b) => a.localeCompare(b))
    return types.length ? IntegrationBadges({types}) : ''
  }, [product])
}
