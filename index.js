// import dependencies
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const client = require("./db/client");
const { testConnection } = require("./model/conn");

require("dotenv").config();

// name a port
const PORT = process.env.SERVER_PORT || 8081;

// create express app
const app = express();

testConnection();

// parse requests of content-type - application/json
app.use(express.json());

// use morgan to log requests to the console
app.use(morgan("dev"));

// enable cors
app.use(cors());

// connect to pg client
client.connect();

// define a root route
app.get("/health", (req, res) => {
  res.send("I AM ALIVE👍");
});

// ROUTER: /api/autos
const autosRouter = require("./api/autos");
const { StatusCodes } = require("http-status-codes");
app.use("/api/autos", autosRouter);

app.use((error, req, res, next) => {
  res.status(StatusCodes.BAD_REQUEST).send(`Bad request: ${error}`);
});

// listen for requests
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
