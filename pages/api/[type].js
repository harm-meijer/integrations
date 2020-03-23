import api from '../../commercetools-api/server'

export default (req, res) => {
  let p = Promise.resolve({})
  const { type, ...query } = req.query
  if (type === 'categories') {
    p = api.getCategories(query)
  }
  if (type === 'product-projections') {
    p = api.getProducts(query)
  }
  p.then(response => {
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(response, undefined, 2))
  }).catch(err => {
    res.statusCode = 500
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(err))
  })
}
