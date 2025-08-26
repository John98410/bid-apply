require('dotenv').config();
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello from Railway!");
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on ${process.env.PORT}...`);
});
