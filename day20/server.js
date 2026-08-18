const http = require("http");

const dishes = [
  {
    name: "doro",
    price: 100,
  },
  {
    name: "tibs",
    price: 200,
  },
];

const server = http.createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");

  if (req.url === "/dishes" && req.method === "GET") {
    res.writeHead(200, {
      "Content-Type": "application/json",
    });

    res.end(JSON.stringify(dishes));
  } else {
    res.writeHead(404, {
      "Content-Type": "text/plain",
    });

    res.end("Not Found");
  }
});

server.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
