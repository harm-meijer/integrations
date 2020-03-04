import React, { memo } from 'react'
import { Text } from '@commercetools-frontend/ui-kit'

const Section = ({ header, subHeader }) => {
  return (
    <div style={{ paddingTop: '15px' }}>
      <Text.Headline as="h1">
        <React.Fragment>{header}</React.Fragment>
      </Text.Headline>
      <Text.Subheadline as="h4">
        <React.Fragment>{subHeader}</React.Fragment>
      </Text.Subheadline>
    </div>
  )
}

export default memo(Section)
