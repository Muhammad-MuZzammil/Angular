// const debug = require("debug")("app:startup");
// const config = require("config"); // working with environment variable
// const helmet = require("helmet");
// const morgan = require("morgan");
// const logger = require("./middleware/logger");
const winston = require('winston')
const express = require("express");
const app = express();

require("./startup/logging");
require("./startup/route")(app);
require("./startup/db")();
require("./startup/config")();
require("./startup/validation")();

// app.set("view engine", "pug");
// app.set("views", "./views");

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // true if u want to work with arrays and complex objects
// app.use(helmet());
// app.use(express.static("public"));

// if (app.get("env") === "development") {
//   app.use(morgan("tiny"));
//   debug("Morgan enabled...");
// }
// console.log("Application Name: " + config.get('name'));
// console.log("Mail Server: " + config.get('mail.host'))
// console.log("Mail Password: " + config.get('mail.password'))

const port = process.env.PORT || 3000;

app.listen(port, () => {
  winston.info(`Listening on port ${port} ...`);
});
