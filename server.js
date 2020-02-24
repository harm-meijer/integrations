const express = require('express')
const next = require('next')
const bodyParser = require('body-parser')
const api = require('./api/server')

const cache = global.cache || new Map()
const dev = process.env.NODE_ENV !== 'production'

const app = next({ dir: '.', dev })
const handle = app.getRequestHandler()

const missNext = (req, res, key, path, query) =>
  app.renderToHTML(req, res, path, query).then(html => {
    if (res.statusCode === 200) {
      cache.set(key, html)
    }
    res.send(html)
  })
const hitNext = (res, content) => {
  res.send(content)
}

const hitApi = (res, content) => {
  res.json(content)
}
const missApi = (req, res, key) => {
  let p = Promise.resolve({})
  if (req.params.type === 'categories') {
    p = api.getCategories(req.query)
  }
  if (req.params.type === 'product-projections') {
    p = api.getProducts(req.query)
  }
  p.then(response => {
    cache.set(key, response)
    res.json(response)
  }).catch(err => {
    res.status(500)
    res.json(err)
  })
}
const renderAndCache = (hit, miss) => (
  req,
  res,
  path,
  query
) => {
  const key = JSON.stringify([req.originalUrl, req.method])
  const exist = cache.get(key)
  if (false) {
    res.setHeader('X-Cache', 'HIT')
    return hit(res, exist)
  }
  res.setHeader('X-Cache', 'MISS')
  return miss(req, res, key, path, query)
}
const renderNext = renderAndCache(hitNext, missNext)

const renderApi = renderAndCache(hitApi, missApi)

app.prepare().then(() => {
  const server = express()

  server.use(bodyParser.json())
  server.use(express.static('public'))
  server.get('/api/flush-cache', (req, res) => {
    cache.forEach((val, key) => cache.delete(key))
    res.json('ok')
  })
  server.get('/api/:type', (req, res) =>
    renderApi(req, res)
  )

  server.get('/integration/:slug', (req, res) =>
    renderNext(req, res, '/integration', {
      slug: req.params.slug
    })
  )

  server.get('/integrations/:category/:page?', (req, res) =>
    renderNext(req, res, '/integrations', {
      category: req.params.category,
      page: req.params.page || 1
    })
  )
  server.get('/search/:q/:page?', (req, res) =>
    renderNext(req, res, '/search', {
      q: req.params.q,
      page: req.params.page || 1
    })
  )
  server.get('/', renderNext)

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(process.env.PORT || 8080, err => {
    if (err) throw err
    console.log(
      `> Read on http://localhost:${process.env.PORT ||
        8080}`
    )
  })
})
