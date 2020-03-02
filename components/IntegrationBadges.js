import React, {useMemo} from 'react'
import {Badge} from 'react-bootstrap'
import {selectMenuCategories} from '../store/selectors'
import {useSelector} from 'react-redux'
import {Tag, Grid} from '@commercetools-frontend/ui-kit';

const IntegrationBadges = ({categories, title}) => (
  <div style={{width:'100%'}}>
    <div>
      <h4>
      {title}
      </h4>
    </div>
    <Grid style={{width:'100%'}}>
      {categories.map(category => (
        <Grid.Item key={category} style={{marginTop: '5px', width: '100%'}}>
          <Tag type="normal" style={{width:'100%'}}>
            {category}
          </Tag>
        </Grid.Item>
      ))}
    </Grid>
  </div>
)
export default function IntegrationBadgesContainer({
                                                     product, title
                                                   }) {
  const menuCategories = useSelector(selectMenuCategories)
  return useMemo(() => {
    const categories = (product?.categories || [])
      .filter(c => menuCategories.get(c.id))
      .map(c => c.name)

    return categories.length
      ? IntegrationBadges({categories, title})
      : ''
  }, [menuCategories, product])
}
