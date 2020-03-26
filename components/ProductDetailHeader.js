import React, {useMemo} from 'react'
import {
  selectQuery,
  selectProductsList,
  useResults as guardResults
} from '../store/selectors'
import {useSelector} from 'react-redux'
import {useProducts} from '../hooks'
import Links from './Links'
import withResult from './withResult'
import {Container} from 'react-bootstrap';
import {Spacings} from "@commercetools-frontend/ui-kit";

const ProductDetailHeader = ({product}) => (
  <div>
    <Spacings.Stack scale={'xl'}>
      <div className="integration-product" style={{paddingTop: '70px'}}>
        <Container style={{textAlign: 'left', zIndex: '1'}}>
          <h1 style={{color: '#1A1A1A'}}>{product.name}</h1>
          <h2>
            {product.ShortDescription}
          </h2>
          <Links product={product}/>
        </Container>
      </div>
    </Spacings.Stack>
  </div>
)
const ResultComponent = withResult(
  ProductDetailHeader,
  () => '',
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
