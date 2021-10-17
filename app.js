// import packages
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv/config");
const port = 8080;
const hostname = "192.168.33.10";
// create an instance of express
const app = express();

// import routes
const usersRoute = require("./routes/users");
// middlewares
app.use(cors());
app.use(express.json());
app.use("/users", usersRoute);
// connect to database
mongoose
  .connect(process.env.DB_CONNECTION)
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log("Failed to connect to DB", err);
  });
// set up server to listen
app.listen(port, hostname, () => {
  console.log(`server running at http://${hostname}:${port}`);
});

