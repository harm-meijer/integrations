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
  return useMemo(() => {
    const links = !product
      ? []
      : [
          ['Download', 'Download'],
          ['Documentation', 'documentation'],
          ['Demo', 'demo']
        ]
          .map(([txt, key]) => [txt, product[key]])
          .filter(([, href]) => href)
    return !links.length ? '' : Links(links)
  }, [product])
}
