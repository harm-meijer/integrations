# Integrations

## Setting credentials

Create a file called secret.js in the root directory of the project with the following content:

```javascript
const secret = {
  PROJECT_KEY: "your-project-name",
  CLIENT_ID: "your-client-id",
  CLIENT_SECRET: "your-client-secret",
  AUTH_URL: "https://auth.url.com",
  API_URL: "https://api.url.com",
  SCOPES:
    "create_anonymous_token:your-project-name manage_my_payments:your-project-name view_products:your-project-name manage_my_orders:your-project-name manage_my_shopping_lists:your-project-name manage_my_profile:your-project-name"
};
module.exports = secret;

```

## Cache

All api calls will be cached on the server, to clear cache you can open the url: http://localhost:8080/api/flush-cache

For debugging you can set SERVER_HYDRATE to false in `next.config.js` and noting will be fetched on the server, this will preven cache problems as well.