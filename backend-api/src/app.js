const express = require("express");
const cors = require("cors");
const jsend = require("./jsend");
const rateLimit = require("express-rate-limit");

// const contactsRouter = require("./routes/contacts.router");
// const {
//   resourceNotFound,
//   handleError,
// } = require("./controllers/errors.controller");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../docs/openapiSpec.json");

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  limit: 20,
  message: jsend.fail({
    message: "Too many requests, please try again later.",
  }),
  statusCode: 429,
  standardHeaders: true,
  legacyHeaders: false,
});

const app = express();
app.use(limiter);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  return res.json(jsend.success({
    message: "API is running",
  }));
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/public", express.static("public"));

// contactsRouter.setup(app);

// Handle 404 error for unknown URL paths
// app.use(resourceNotFound);

// Define the centralized error handling middleware, after all routes
// and middlewares have been defined.
// app.use(handleError);

module.exports = app;
