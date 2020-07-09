const express = require("express");

const app = express();

const PORT = 3000;

app.get("/", (req, res) => {
  res.send("It's working");
});

app.listen(PORT, () => {
  console.log(`Your Server is running On port ${PORT} `);
});
