const express = require('express')
const next = require('next')
const bodyParser = require('body-parser')
import { getProducts, getCategories } from './api/server'

const cache = global.cache || new Map()
const dev = process.env.NODE_ENV !== 'production'

const app = next({ dir: '.', dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = express()

  server.use(bodyParser.json())
  server.use(express.static('public'))
  server.get('/api/flush-cache', (req, res) => {
    cache.forEach((val, key) => cache.delete(key))
    res.json('ok')
  })
  server.get('/api/:type', (req, res) => {
    let p = Promise.resolve({})
    if (req.params.type === 'categories') {
      p = getCategories(req.query)
    }
    if (req.params.type === 'product-projections') {
      p = getProducts(req.query)
    }
    p.then(response => {
      res.json(response)
    }).catch(err => {
      res.status(500)
      res.json(err)
    })
  })

  server.get('/integration/:slug', (req, res) => {
    app.render(req, res, '/integration', {
      slug: req.params.slug
    })
  })

  server.get(
    '/integrations/:category/:page?',
    (req, res) => {
      app.render(req, res, '/integrations', {
        category: req.params.category,
        page: req.params.page || 1
      })
    }
  )
  server.get('/search/:q/:page?', (req, res) => {
    app.render(req, res, '/search', {
      q: req.params.q,
      page: req.params.page || 1
    })
  })
  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(8080, err => {
    if (err) throw err
    console.log('> Read on http://localhost:8080')
  })
})
