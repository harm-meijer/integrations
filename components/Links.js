import React, { useMemo } from 'react'
import {PrimaryButton} from '@commercetools-frontend/ui-kit';

const Links = links => (
  <React.Fragment>
    {links.map(([txt, href]) => (
      <PrimaryButton
        tone="primary"
        key={txt}
        label={txt}
        size="big"
        buttonAttributes={{href:href, rel:'noopener noreferrer', target:'_blank'}}
        as="a"
      >
      </PrimaryButton>
    ))}
  </React.Fragment>
)
export default function LinksContainer({ product }) {

  // The links will be created based on the assets

  return useMemo(() => {
    const links = !product.assets
      ? []
      : product.assets.map((asset) => {

        if (asset.name && asset.sources[0]) {
          return [asset.name['en'], asset.sources[0].uri];
        }

      })
    return !links.length ? '' : Links(links)
  }, [product])
}
