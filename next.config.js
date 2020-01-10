const withSass = require('@zeit/next-sass')

module.exports = withSass({
  env: {
    LANGUAGE: 'en-US',
    MENU_CATEGORY: ['integrations', 'topics'],
    // LANGUAGE: 'en',
    // MENU_CATEGORY: ['c2', 'c3'],
    // set false when debugging
    SERVER_HYDRATE: true,
    API: 'http://localhost:8080/api',
    LOCAL_API: 'http://localhost:8080/api',
    SITE: 'http://localhost:8080/'
  }
})
