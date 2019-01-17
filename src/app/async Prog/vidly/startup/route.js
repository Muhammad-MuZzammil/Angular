const genres = require("../routes/genres");
const home = require("../routes/home");
const customers = require("../routes/customer");
const movies = require("../routes/movies");
const users = require("../routes/users");
const rentals = require("../routes/rentals");
const auth = require("../routes/auth");
const error = require("../middleware/error");

module.exports = function(app) {
  app.use("/api/genres", genres);
  app.use("/api/customers", customers);
  app.use("/api/movies", movies);
  app.use("/api/rentals", rentals);
  app.use("/api/users", users);
  app.use("/api/auth", auth);
  app.use("/", home);
  app.use(error);
};
