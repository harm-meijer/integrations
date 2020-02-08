import React, { useMemo } from 'react'
import { useProducts } from '../hooks'
import { useSelector } from 'react-redux'
import {
  selectProductPage,
  selectQuery,
  selectProductColumns,
  useResults
} from '../store/selectors'
import Link from 'next/link'
import { Container, Row, Col } from 'react-bootstrap'
import Product from './Product'
import withResult from './withResult'
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
      {false &&
      path &&
      total > 1 && ( //paging, is disabled (need styling)
          <Row>
            <Col>
              {[...new Array(total)]
                .map((_, index) => index + 1)
                .map(page => (
                  <Link
                    href={`/${path}?${queryKey}=${query[queryKey]}&page=${page}`}
                    as={`/${path}/${query[queryKey]}/${page}`}
                    key={page}
                  >
                    <a>{page} </a>
                  </Link>
                ))}
            </Col>
          </Row>
        )}
      {products.map((productRow, index) => (
        <Row key={index}>
          {productRow.map(product => (
            <Col key={product.id} sm={12 / columns}>
              <Product {...product} />
            </Col>
          ))}
        </Row>
      ))}
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
    selectProductColumns(state, productQuery, columns)
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
