const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const port = process.env.port || 5000;

// Middleware
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Ema-John is Running");
});

app.listen(port, () => {
  console.log(`Ema-John Server is Running on Port:${port}`);
});
