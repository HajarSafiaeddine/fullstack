const express = require("express");
const app = express();
const route = require("./app/routers/livresRouter");
const bodyparser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
var corsOptions = {
  origin: process.env.CLIENT_ORIGIN || "http://localhost:6500"
};
app.use(cors(corsOptions));
const PORT = process.env.NODE_DOCKER_PORT || 6500;
app.use("/uploads", express.static("uploads"));
app.use("/", route);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(
  cors({
    origin: "*",
  })
);



