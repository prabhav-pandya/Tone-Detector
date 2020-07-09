const express = require("express");

const getResponse = require("./get_response");

const app = express();

const PORT = 3000;

app.get("/", (req, res) => {
  res.send(
    "Send a request in the following format: http//localhost:3000/yourtext"
  );
});

app.get("/:text", (req, res) => {
  res.json(getResponse(req.params.text));
});

app.listen(PORT, () => {
  console.log(`Your Server is running On port ${PORT} `);
});
