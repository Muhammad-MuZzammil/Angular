const debug = require("debug")("app:startup");
const config = require("config");
const helmet = require("helmet");
const morgan = require("morgan");
const express = require("express");
const logger = require("./middleware/logger");
const app = express();
const genres = require("./routes/genres");
const home = require("./routes/home");
const customers = require('./routes/customer')
const movies = require('./routes/movies')
const mongoose = require("mongoose");

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
app.use('/api/customers',customers)
app.use('/api/movies',movies)
app.use("/", home);

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
