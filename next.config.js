const withSass = require('@zeit/next-sass')

module.exports = withSass({
  env: {
    LANGUAGE: 'en-US',
    MENU_CATEGORY: ['integrations', 'topics'],
    HOME_PAGE_CATEGORIES: [
      'most-popular',
      'newest-integrations'
    ],
    // set false when debugging
    SERVER_HYDRATE: true,
    API:
      process.env.NODE_ENV === 'production'
        ? 'https://commercetools-integrations.herokuapp.com/api'
        : 'http://localhost:8080/api',
    LOCAL_API:
      process.env.NODE_ENV === 'production'
        ? 'https://commercetools-integrations.herokuapp.com/api'
        : 'http://localhost:8080/api',
    SITE:
      process.env.NODE_ENV === 'production'
        ? 'https://commercetools-integrations.herokuapp.com/api/'
        : 'http://localhost:8080/api/'
  }
})
