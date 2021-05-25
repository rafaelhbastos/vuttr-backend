const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

const toolRoutes = require("./api/routes/tools");

mongoose.connect(
  "mongodb+srv://rafaelpessoa12:" +
    process.env.MONGO_ATLAS_PW +
    "@cluster0.05jl7.mongodb.net/vuttrDatabase?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

app.use(cors());
app.use(express.json());

app.use("/tools", toolRoutes);

module.exports = app;

//This is a comment that will be added in order to test the untracking file
