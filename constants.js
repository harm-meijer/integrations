export const LANGUAGE = process.env.LANGUAGE
export const API =
  process.env.NODE_ENV === 'production'
    ? 'https://integrations-sigma.now.sh/api'
    : 'http://localhost:8080/api'
export const SITE =
  process.env.NODE_ENV === 'production'
    ? 'https://integrations-sigma.now.sh/'
    : 'http://localhost:8080/'
