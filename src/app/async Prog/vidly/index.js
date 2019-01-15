require("express-async-errors"); // redirect to error middleware
const debug = require("debug")("app:startup");
const winston = require("winston");
require('winston-mongodb')
const config = require("config"); // working with environment variable
const helmet = require("helmet");
const morgan = require("morgan");
const express = require("express");
const logger = require("./middleware/logger");
const app = express();
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi); // working with objectID
const genres = require("./routes/genres");
const home = require("./routes/home");
const customers = require("./routes/customer");
const movies = require("./routes/movies");
const users = require("./routes/users");
const rentals = require("./routes/rentals");
const auth = require("./routes/auth");
const error = require("./middleware/error");
const mongoose = require("mongoose");

process.on('uncaughtException',(ex)=>{
  console.log(ex);
  winston.error(ex.message,ex);
})

winston.add(winston.transports.File, { filename: "logfile.log" });
winston.add(winston.transports.MongoDB,{ 
  db:'mongodb://localhost/vidly',
  level:'info'
})

throw new Error('Something failed during startups')
if (!config.get("jwtPrivateKey")) {
  console.error("FATAL ERROR: jwtPrivateKey is not defined.");
  process.exit(1);
}

mongoose
  .connect("mongodb://localhost/vidly")
  .then(() => console.log("Connected to MongoDB..."))
  .catch(err => console.error("Connection failed...", err.message));

app.set("view engine", "pug");
app.set("views", "./views");

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // true if u want to work with arrays and complex objects
app.use(helmet());
app.use(express.static("public"));

app.use("/api/genres", genres);
app.use("/api/customers", customers);
app.use("/api/movies", movies);
app.use("/api/rentals", rentals);
app.use("/api/users", users);
app.use("/api/auth", auth);
app.use("/", home);
app.use(error);

if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  debug("Morgan enabled...");
}
// console.log("Application Name: " + config.get('name'));
// console.log("Mail Server: " + config.get('mail.host'))
// console.log("Mail Password: " + config.get('mail.password'))

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port} ...`);
});
