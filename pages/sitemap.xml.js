import { needCategories, withPage } from '../helpers'
import {
  selectCategoriesNested,
  selectProductsList
} from '../store/selectors'
import { LANGUAGE } from '../constants'
import { loadProducts } from '../store/actions'

function Sitemap() {}
Sitemap.getInitialProps = ({ res, store }) => {
  if (process.env.SERVER_HYDRATE) {
    res.setHeader('Content-Type', 'text/xml')
    return needCategories(store)
      .then(() =>
        selectCategoriesNested(store.getState()).map(
          category => [
            category,
            withPage({
              category: category.slug,
              pageSize: 1,
              sort: 'lastModifiedAt desc'
            })
          ]
        )
      )
      .then(results =>
        Promise.all(
          results.map(([category, query]) =>
            Promise.all([
              category,
              store
                .dispatch(loadProducts(query))
                .then(
                  () =>
                    selectProductsList(
                      store.getState(),
                      query
                    )?.[0]?.lastModifiedAt
                )
            ])
          )
        )
      )
      .then(result => {
        let xml = '<?xml version="1.0" encoding="UTF-8"?>'
        xml +=
          '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'
        xml += result
          .map(
            ([category, lastMod]) =>
              '<url>' +
              '<loc>' +
              process.env.SITE +
              category.slug +
              '</loc>' +
              (lastMod
                ? '<lastmod>' + lastMod + '</lastmod>'
                : '') +
              '</url>'
          )
          .join('')
        xml += '</urlset>'
        res.setHeader('Content-Type', 'text/xml')
        res.write(xml)
        res.end()
      })
  }
  return {}
}

export default Sitemap
