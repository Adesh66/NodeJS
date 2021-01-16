const express = require("express");
const app = express();
const port = 9096;

app.get("/", async (req, res) => {
  res.send({
    ok: true,
  });
});

app.listen(port, () => {
  console.log(`App is listening at http://localhost:${port}`);
});
