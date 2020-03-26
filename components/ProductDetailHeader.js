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
import {Spacings, Grid} from "@commercetools-frontend/ui-kit";

const ProductDetailHeader = ({product}) => (

  <Spacings.Stack scale={'xl'}>
    <div className="integration-product" style={{paddingTop: '70px', minHeight: '350px'}}>
      <Container style={{textAlign: 'left', zIndex: '1'}}>
        <h1 style={{color: '#1A1A1A'}}>{product.name}</h1>
        <h2>
          {product.ShortDescription}
        </h2>
        <Grid gridAutoColumns="1fr" gridTemplateColumns={'repeat(auto-fill, minmax(200px, 1fr))'} gridGap="16px">
          <Links product={product}/>
        </Grid>
      </Container>
    </div>
  </Spacings.Stack>
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
