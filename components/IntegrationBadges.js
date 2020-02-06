import React, {useMemo} from 'react'
import {Badge} from 'react-bootstrap';

const IntegrationTypes = ({types}) => (
  <div>
    {types.map(type => (
      <Badge variant="light" key={type} style={{marginRight: '5px'}}>{type}</Badge>
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
        .map(c => {
            console.log(c);

            // TODO: Properly ignore the non category ones

            return c.name
          }
        )
        .sort((a, b) => a.localeCompare(b))
    return types.length ? IntegrationTypes({types}) : ''
  }, [product])
}
