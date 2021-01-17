require("dotenv").config();
const express = require("express");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const routes = require("../routes");

const isProd = process.env.NODE_ENV === "production";
const PORT = 3300;

const createHttpServer = () => {
  const app = express();
  app.use(cors());
  app.set("json spaces", 2);
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.disable("x-powered-by");
  app.all(isProd ? "/" : /api\//, routes);
  app.use(
    express.static("public", {
      dotfiles: "allow",
      fallthrough: false
    })
  );

  const httpServer = app.listen(PORT, () => {
    console.log(`Server is live at localhost:${PORT}`);
  });

  return httpServer;
};

if (require.main === module) {
  createHttpServer();
}

module.exports = createHttpServer;
