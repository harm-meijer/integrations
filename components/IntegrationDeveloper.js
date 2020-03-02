import React, { useMemo } from 'react'
import {PrimaryButton, SecondaryButton, ExternalLinkIcon} from '@commercetools-frontend/ui-kit';


const IntegrationDeveloper = developer => (
  <React.Fragment>
    <div>
      <h4>
        Developed by
      </h4>
    </div>
    <div>
      {developer}
    </div>
  </React.Fragment>
);

export default function IntegrationDeveloperContainer({ product }) {

  // The element will be created based on the assets and/or existence of variant image with tag 'developer'
  return useMemo(() => {

    return IntegrationDeveloper(product.Developer);
    // TODO: Fix this
    /*
    const links = !product.assets
      ? []
      : product.assets.map((asset) => {

        if (asset.name && asset.sources[0]) {
          return [asset.name['en'], asset.sources[0].uri, asset.tags];
        }

      })
    return !links.length ? '' : IntegrationDeveloper(link)
    */
  }, [product])
}
