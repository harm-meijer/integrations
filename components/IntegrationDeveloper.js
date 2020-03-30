import React, {useMemo} from 'react'
import {PrimaryButton, SecondaryButton, ExternalLinkIcon, Tag, Spacings} from '@commercetools-frontend/ui-kit';
import Row from 'react-bootstrap/Row';

const IntegrationDeveloper = (developer, title) => (
  <React.Fragment>
    <Spacings.Stack scale="s">
      <h4>
        {title}
      </h4>
      <span style={{width: '100%'}}>
        {developer}
      </span>
    </Spacings.Stack>
  </React.Fragment>
);

export default function IntegrationDeveloperContainer({product, title}) {

  // The element will be created based on the assets and/or existence of variant image with tag 'developer'
  return useMemo(() => {

    // We will

    return IntegrationDeveloper(product.Developer, title);
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
