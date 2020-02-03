import React, { useMemo } from 'react'
import {
  selectQuery,
  selectCategoryBySlug
} from '../store/selectors'
import { useSelector } from 'react-redux'
import { useCategories } from '../hooks'

const IntegrationsHeader = category => (
  <div className="integration">
    <h1 className="big-title">{category.name}</h1>
    <h1 className="integration-header">
      {category.description}
    </h1>
  </div>
)
export default function IntegrationsHeaderContainer() {
  const query = useSelector(selectQuery)
  useCategories(query)
  const category = useSelector(state =>
    selectCategoryBySlug(state, query.category)
  )

  return useMemo(
    () => (category ? IntegrationsHeader(category) : ''),
    [category]
  )
}
