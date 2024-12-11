const express = require("express");
const connectdb = require("./db");
const router = require("./routes");
const swaggerJsDocs = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const app = express();
const port = 3000;

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Swagger Demo",
      version: "3.0.0",
    },
  },
  apis: ["./controller.js"],
};

const openapiSpecification = swaggerJsDocs(options);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openapiSpecification));

app.use(express.json());
connectdb();

app.use("/", router);

app.listen(port, () => {
  console.log(`Server listen to ${port}`);
  console.log(`Swagger is on http://localhost:${port}/api-docs`);
});
