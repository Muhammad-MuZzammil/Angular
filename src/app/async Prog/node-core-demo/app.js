// var Logger = require("./logger");

// var logger = new Logger();

// logger.on("saad", arg => {
//   console.log(arg);
// });

// logger.log('kane')

const http = require("http");

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.write("saad");
    res.end();
  }
  if (req.url === "/api/courses") {
    res.write([1,2,3]);
    res.end();
  }
});

server.listen(3000);

console.log("server start port 3000...");
