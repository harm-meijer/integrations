import React, { useMemo } from 'react'
import { Badge } from 'react-bootstrap'
import { selectMenuCategories } from '../store/selectors'
import { useSelector } from 'react-redux'
import {Tag, Grid} from '@commercetools-frontend/ui-kit';

const IntegrationBadges = ({ categories }) => (
  <Grid>
    {categories.map(category => (
      <Grid.Item key={category}>
      <Tag
        type="normal"
        style={{padding:'15px'}}

      >
        {category}
      </Tag>
      </Grid.Item>
    ))}
  </Grid>
)
export default function IntegrationBadgesContainer({
  product
}) {
  const menuCategories = useSelector(selectMenuCategories)
  return useMemo(() => {
    const categories = (product?.categories || [])
      .filter(c => menuCategories.get(c.id))
      .map(c => c.name)

    return categories.length
      ? IntegrationBadges({ categories })
      : ''
  }, [menuCategories, product])
}
