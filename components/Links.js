import React, { useMemo } from 'react'

const Links = ({ links }) => (
  <React.Fragment>
    <h1 className="integration-header">Links</h1>
    <ul>
      {links.map(([name, link]) => (
        <li key={name}>
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
          >
            {name}
          </a>
        </li>
      ))}
    </ul>
  </React.Fragment>
)
export default function LinksContainer({ product }) {
  return useMemo(() => {
    const links = !product
      ? []
      : ['documentation', 'demo', 'Download']
          .map(key => [key, product[key]])
          .filter(([, val]) => val)
    return !links.length
      ? ''
      : Links({
          links
        })
  }, [product])
}
