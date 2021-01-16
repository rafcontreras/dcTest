const swaggerJSDoc = require("swagger-jsdoc");
const saveFile = require("../../shared/saveFile");

const PORT = process.env.PORT || 3300;
const savePath = "./src/data/"

const createDocs = async () => {
  const swaggerDefinition = {
    openapi: "3.0.0",
    info: {
      title: "API for shopping list",
      version: "1.0.0",
      description:
        "This is a REST API application made with Express. It retrieves data from a JSON database.",
      license: {
        name: "Licensed Under MIT",
        url: "https://spdx.org/licenses/MIT.html"
      }
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
        description: "Development server"
      }
    ]
  };

  const options = {
    swaggerDefinition,
    apis: ["./expressSrc/routes/*.js"]
  };

  const swaggerSpec = swaggerJSDoc(options);

  await saveFile(swaggerSpec, `${savePath}swagger.json`);

};

module.exports = createDocs;
