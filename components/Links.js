import React, { useMemo } from 'react'
import {PrimaryButton, SecondaryButton, ExternalLinkIcon, Grid} from '@commercetools-frontend/ui-kit';
import ReactGA from 'react-ga';

const Links = links => (
  <React.Fragment>
    {links.map(([txt, href, tags, name]) => {

        if (tags.indexOf('cta') > -1) {
          return (

            <PrimaryButton
              tone="primary"
              key={txt}
              label={txt}
              size="big"
              as="button"
              data-tag={JSON.stringify(tags)}
              onClick={() => {
                // route to new page by changing window.location
                ReactGA.outboundLink({
                  label: 'Opened ' + name + " - " + txt
                }, function () {
                  window.open(href, "_blank", "noopener")
                });
                 //to open new page
              }}
              iconLeft={React.createElement(ExternalLinkIcon)}
              style={{marginRight: '10px'}}
            >

            </PrimaryButton>


          )
        } else {
          return (

            <SecondaryButton
              theme="default"
              key={txt}
              label={txt}
              onClick={() => {
                // route to new page by changing window.location
                ReactGA.outboundLink({
                  label: 'Opened ' + name + " - " + txt
                }, function () {
                  window.open(href, "_blank", "noopener")
                });
              }}
              iconLeft={React.createElement(ExternalLinkIcon)}
              style={{marginRight: '10px'}}
            >
            </SecondaryButton>

          )
        }
      }
    )}
  </React.Fragment>
)
export default function LinksContainer({ product }) {

  // The links will be created based on the assets

  return useMemo(() => {
    const links = !product.assets
      ? []
      : product.assets.map((asset) => {

        if (asset.name && asset.sources[0]) {
          return [asset.name['en'], asset.sources[0].uri, asset.tags, product.name];
        }

      })
    return !links.length ? '' : Links(links)
  }, [product])
}
