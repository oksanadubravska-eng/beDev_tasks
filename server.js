const express = require("express");

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.send("<h1>Hello from the Guestbook server!</h1><p>Server is running on port " + PORT + "</p>");
});

app.listen(PORT, () => {
  console.log(`Guestbook server running at http://localhost:${PORT}`);
});
