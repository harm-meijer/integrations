export const LANGUAGE = process.env.LANGUAGE
export const API =
  process.env.NODE_ENV === 'production'
    ? // ? 'https://marketplace.commercetools.com/api'
      //  can also try loopback ip
      //probaly won't work but worth a try
      'http://127.0. 0.1/api'
    : 'http://localhost:8080/api'
export const SITE =
  process.env.NODE_ENV === 'production'
    ? 'https://marketplace.commercetools.com/'
    : 'http://localhost:8080/'
