import { SITE } from '../constants'

function Robots() {}
Robots.getInitialProps = ({ res }) => {
  res.setHeader('Content-Type', 'text/plain')
  res.write(`User-agent: *
  Disallow:
  Sitemap: ${SITE}sitemap.xml`)
  res.end()
}

export default Robots
