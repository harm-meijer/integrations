import React, { useMemo } from 'react'
import { useProducts } from '../hooks'
import { useSelector } from 'react-redux'
import {
  selectProductPage,
  selectQuery,
  selectProductsList,
  useResults
} from '../store/selectors'
import { Container, Row, Col } from 'react-bootstrap'
import Product from './Product'
import withResult from './withResult'

import { Grid } from '@commercetools-frontend/ui-kit'
import Link from 'next/link'

const List = ({
  products,
  showMoreLink
  // query,
  // path,
  // queryKey,
  // total,
  // columns
}) => {
  // pagination
  // {path &&
  //   total > 1 && ( //paging, is disabled (need styling)
  //           {[...new Array(total)]
  //             .map((_, index) => index + 1)
  //             .map(page => (
  //               <Link
  //                 href={`/${path}?${queryKey}=${query[queryKey]}&page=${page}`}
  //                 as={`/${path}/${query[queryKey]}/${page}`}
  //                 key={page}
  //               >
  //                 <a>{page} </a>
  //               </Link>
  //             ))}
  //     )}
  return products.length ? (
    <Container className="product-list">
      <Grid
        gridGap="16px"
        gridAutoColumns="1fr"
        gridTemplateColumns={'repeat(4, 1fr)'}
      >
        {products.map((product, index) => (
          <Grid.Item key={index} className="clickable">
            <Product {...product} />
          </Grid.Item>
        ))}
      </Grid>

      {
        showMoreLink &&
        <div style={{paddingTop: '10px'}}>
          <Link href='/integrations/all'>
            <a>See all available integrations...</a>
          </Link>
        </div>
      )}
    </Container>
  ) : (
    <Container className="product-list">
      <Row>
        <Col sm={12}>
          <div>
            <h4>No results found</h4>
          </div>
          <div>
            <Link href='/integrations/all'>
              <a>See all available integrations...</a>
            </Link>
          </div>
        </Col>
      </Row>
    </Container>
  )
}
const ResultComponent = withResult(List)
const ProductListContainer = ({
  query,
  showMoreLink = false
  // path,
  // queryKey,
  // columns = 4,
  // title,
  // subTitle
}) => {
  const queryFromStore = useSelector(selectQuery)
  const productQuery = query || queryFromStore
  useProducts(productQuery)
  const productsResult = useSelector(state =>
    selectProductsList(state, productQuery)
  )
  const productPageResult = useSelector(state =>
    selectProductPage(state, productQuery)
  )
  const result = useResults([
    productsResult,
    productPageResult
  ])(([products, productPage]) => ({
    products,
    total: Number(productPage.total || 0)
  }))
  return useMemo(
    () =>
      ResultComponent({
        ...result.value,
        ...result,
        showMoreLink
        // query: productQuery,
        // path,
        // queryKey,
        // title,
        // subTitle: title === subTitle ? '' : subTitle,
        // columns
      }),
    [result, showMoreLink]
  )
}
export default ProductListContainer
