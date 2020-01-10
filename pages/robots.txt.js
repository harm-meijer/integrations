function Robots() {}
Robots.getInitialProps = ({ res }) => {
  res.setHeader('Content-Type', 'text/plain')
  res.write(`User-agent: *
  Disallow:
  Sitemap: ${process.env.SITE}sitemap.xml`)
  res.end()
}

export default Robots
