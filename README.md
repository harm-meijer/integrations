# Integrations

Example can [viewed on heroku](https://commercetools-integrations.herokuapp.com/)

## Setting credentials

Create a file called .env in the root directory of the project with the following content:

```shell
PROJECT_KEY=your project key (when you export from merchant center)
CLIENT_SECRET=your client secret (when you export from merchant center)
CLIENT_ID=your client id (when you export from merchant center)
AUTH_URL=your auth url (when you export from merchant center)
API_URL=your api url (when you export from merchant center)
SCOPES=your scopses (when you export from merchant center)
```

## Cache

All api calls will be cached on the server, to clear cache you can open the url: http://localhost:8080/api/flush-cache

For debugging you can set SERVER_HYDRATE to false in `next.config.js` and noting will be fetched on the server, this will preven cache problems as well.

## Todos

- [ ] sitemap.xml fetch all pages
- [ ] cache in api and state can move to service worker
- [ ] SEO for index page
- [ ] Multiple languages
- [ ] Product.js css
- [ ] Css for error and loading
- [ ] Menu closes if you miss the link
