import api from '../../commercetools-api/server'

export default (req, res) => {
  let p = Promise.resolve({})
  const { type, ...query } = req.query
  if (type === 'env') {
    p = Promise.resolve([
      process.env.PROJECT_KEY,
      process.env.CLIENT_SECRET,
      process.env.CLIENT_ID,
      process.env.AUTH_URL,
      process.env.API_URL,
      process.env.SCOPES
    ])
  }
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
