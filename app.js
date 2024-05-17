const http = require("node:http");
const routes = require("./routes");
const hostname = "127.0.0.1";
const port = 3000;
const server = http.createServer((req, res) => {
    routes.requestHandler(req, res);
});
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
