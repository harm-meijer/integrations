console.log(
  'is this working?',
  process.env.NODE_ENV,
  process.env.PORT
)
export const LANGUAGE = process.env.LANGUAGE
export const API =
  process.env.NODE_ENV === 'production'
    ? 'https://commercetools-integrations.herokuapp.com/api'
    : 'http://localhost:8080/api'
export const LOCAL_API = `http://localhost:${process.env
  .PORT || 8080}/api`
export const SITE =
  process.env.NODE_ENV === 'production'
    ? 'https://commercetools-integrations.herokuapp.com/'
    : 'http://localhost:8080/'
