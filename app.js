const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const apiRouter = require("./routes");

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use("/api", apiRouter);

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error(err));

// Start server
const port = process.env.PORT || 6000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
