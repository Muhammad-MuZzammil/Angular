const Joi = require("joi");
const express = require("express");
const courses = require("./routes/courses");
const home = require("./routes/home");
const app = express();
//404 record not found
//400 bad request

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/courses", courses);
app.use("/", home);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
