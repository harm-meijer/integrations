import React, { useMemo } from 'react'
import { useProducts } from '../hooks'
import { useSelector } from 'react-redux'
import {
  selectProductPage,
  selectQuery,
  selectProductsList,
  useResults
} from '../store/selectors'
import Link from 'next/link'
import { Container, Row, Col } from 'react-bootstrap'
import Product from './Product'
import withResult from './withResult'

import {Grid, Card} from '@commercetools-frontend/ui-kit';

const List = ({
  products,
  query,
  path,
  queryKey,
  total,
  columns
}) => {
  return products.length ? (
    <Container className="product-list">
      <Grid gridGap="16px" gridAutoColumns="1fr" gridTemplateColumns={'repeat(4, 1fr)'} >
      {
        products.map((product, index) => (
          <Grid.Item key={index}>
            <Product {...product} />
          </Grid.Item>
        )
        )
      }
      </Grid>
    </Container>
  ) : (
    <Container className="product-list">
      <Row>
        <Col sm={12}>No results found</Col>
      </Row>
    </Container>
  )
}
const ResultComponent = withResult(List)
const ProductListContainer = ({
  query,
  path,
  queryKey,
  columns = 4,
  title,
  subTitle
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
        query: productQuery,
        path,
        queryKey,
        title,
        subTitle: title === subTitle ? '' : subTitle,
        columns
      }),
    [
      result,
      productQuery,
      path,
      queryKey,
      title,
      subTitle,
      columns
    ]
  )
}
export default ProductListContainer
