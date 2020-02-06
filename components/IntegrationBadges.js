import React, { useMemo } from 'react'
import { Badge } from 'react-bootstrap'
import { selectMenuCategories } from '../store/selectors'
import { useSelector } from 'react-redux'

const IntegrationBadges = ({ categories }) => (
  <div>
    {categories.map(category => (
      <Badge
        variant="light"
        key={category.id}
        style={{ marginRight: '5px' }}
      >
        {category}
      </Badge>
    ))}
  </div>
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
