const express = require("express");
const server = express();
const projectRouter = require("./resources/project/projectRouter");
const actionRouter = require("./resources/action/actionRouter");
const PORT = 8000;

server.use(express.json());
server.use("/api/projects", projectRouter);
server.use("/api/actions", actionRouter);

server.get("/", (req, res) => {
  res.json({ message: "Hello" });
});
server.listen(PORT, () => {
  console.log(`--Server is listening on ${PORT}--`);
});
module.exports = server;
