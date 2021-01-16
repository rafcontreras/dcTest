require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");

const PORT = process.env.NODE_ENV === "production" ? 8000 : 3300;

const routes = require("../routes");

const createHttpServer = () => {
  const app = express();
  app.set("json spaces", 2);
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.disable("x-powered-by");
  app.use("/", routes);

  const httpServer = app.listen(PORT, () => {
    console.log(`Server is live at localhost:${PORT}`);
  });

  return httpServer;
};

if (require.main === module) {
  createHttpServer();
}

module.exports = createHttpServer;
