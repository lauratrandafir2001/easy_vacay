const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const apiRouter = require("./routes");

const app = express();

require('dotenv').config();

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use("/api", apiRouter);

// Connect to MongoDB
mongoose
  .connect(process.env.DATABASE_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    user: process.env.DATABASE_USER,
    pass: process.env.DATABASE_PASSWORD,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error(err));

console.log(process.env);

// Start server
const port = process.env.NODE_PORT || 6000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

