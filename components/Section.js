import React, { memo } from 'react'
import { Text, Spacings } from '@commercetools-frontend/ui-kit'

const Section = ({ header, subHeader }) => {
  return (
    <Spacings.Inset scale={'l'}>

      <Text.Headline as="h1">
        <React.Fragment>{header}</React.Fragment>
      </Text.Headline>
      <Text.Subheadline as="h4">
        <React.Fragment>{subHeader}</React.Fragment>
      </Text.Subheadline>

    </Spacings.Inset>
  )
}

export default memo(Section)
