import React, { memo } from 'react'
import {Text} from '@commercetools-frontend/ui-kit';

const Section = ({header, subHeader}) => {
  return (
    <div style={{paddingTop:'15px'}}>
      <Text.Headline as="h1">
        {header}
      </Text.Headline>
      <Text.Subheadline as="h4">
        {subHeader}
      </Text.Subheadline>
    </div>
  )
}

export default memo(Section);

