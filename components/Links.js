import React, { useMemo } from 'react'
import { Button } from 'react-bootstrap'

const Links = links => (
  <React.Fragment>
    {links.map(([txt, href]) => (
      <Button
        variant="primary"
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        key={txt}
        className="link-button"
      >
        {txt}
      </Button>
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
