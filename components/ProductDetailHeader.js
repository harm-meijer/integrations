import React, { useMemo } from 'react'
import {
  selectQuery,
  selectProductsList,
  useResults as guardResults
} from '../store/selectors'
import { useSelector } from 'react-redux'
import { useProducts } from '../hooks'
import Links from './Links'
import IntegrationBadges from './IntegrationBadges'
import withResult from './withResult'

const ProductDetailHeader = ({ product }) => (
  <div className="integration">
    <IntegrationBadges product={product} />
    <h1 className="big-title">{product.name}</h1>
    <h1 className="integration-header">
      {product.ShortDescription}
    </h1>
    <Links product={product} />
  </div>
)
const ResultComponent = withResult(
  ProductDetailHeader,
  () => ''
)

export default function ProductDetailHeaderContainer() {
  const query = useSelector(selectQuery)
  useProducts(query)
  const productResult = useSelector(state =>
    selectProductsList(state, query)
  )

  return useMemo(() => {
    const result = guardResults([productResult])(([p]) => ({
      product: p[0]
    }))
    return ResultComponent({
      ...result.value,
      ...result
    })
  }, [productResult])
}
