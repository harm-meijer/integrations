const express = require("express");
const next = require("next");
const bodyParser = require("body-parser");

const dev = process.env.NODE_ENV !== "production";

const app = next({ dir: ".", dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.use(bodyParser.json());

  server.get(
    "/products-of-category/:categorySlug",
    (req, res) => {
      app.render(req, res, "/products-of-category", {
        "category-slug": req.params.categorySlug
      });
    }
  );
  server.get("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(8080, err => {
    if (err) throw err;
    console.log("> Read on http://localhost:8080");
  });
});
