const fs = require("node:fs");

const users = [];
const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === "/") {
    const userWelcomeHtml = fs.readFileSync("user-welcome.html", "utf-8");

    res.write(userWelcomeHtml);

    res.end();
  }
  if (url === "/show-users" && method === "GET") {
    let userListHtml = fs.readFileSync("show-users.html", "utf-8");

    // Inject the users into the HTML
    const userItems = users.map((user) => `<li>${user}</li>`).join("");
    userListHtml = userListHtml.replace("{{userList}}", userItems);

    res.setHeader("Content-Type", "text/html");
    res.write(userListHtml);
    res.end();
  }
  if (url === "/create-user" && method === "POST") {
    const createNewUser = fs.readFileSync("create-user.html", "utf-8");

    res.write(createNewUser);
    res.end();
  }
  if (url === "/save-user" && method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      body.push(chunk);
    });

    req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split("=")[1];
      users.push(message);
      res.statusCode = 302;
      res.setHeader("Location", "/show-users");
      res.end();
    });
  }
};
module.exports = {
  requestHandler,
};
