const Joi = require("joi");
const helmet = require('helmet')
const morgan = require('morgan')
const express = require("express");
const logger = require('./logger')
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true})) // true if u want to work with arrays and complex objects
app.use(helmet())
app.use(morgan('tiny'))
app.use(express.static('public'))
// app.use(logger.log)
// app.use(logger.auth)
const genres = [
  { id: 1, name: "Horror" },
  { id: 2, name: "Action" },
  { id: 3, name: "Martial Arts" }
];

app.get("/", (req, res) => {
  res.send("Saad");
});

app.get("/api/genres", (req, res) => {
  res.send(genres);
});

app.get("/api/genres/:id", (req, res) => {
  const movie = genres.find(m => m.id === parseInt(req.params.id));
  if (!movie) return res.status(404).send("Record not found");
  res.send(movie);
});

app.post("/api/genres", (req, res) => {
  
  let { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let movie = {
    id: genres.length + 1,
    name: req.body.name
  };
  genres.push(movie);
  res.send(genres);
});

app.put("/api/genres/:id", (req, res) => {
  // is record exist
  const movie = genres.find(m => m.id === parseInt(req.params.id));
  if (!movie) return res.status(404).send("Record not found");

  // is record valid
  let { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // if record exist and valid then update result
  movie.name = req.body.name;
  res.send(movie);
});

app.delete("/api/genres/:id", (req, res) => {
  const movie = genres.find(m => m.id === parseInt(req.params.id));
  if (!movie) return res.status(404).send("Record not found");

  let index = genres.indexOf(movie);
   genres.splice(index, 1);
  res.send(movie);
});

function validateGenre(genre) {
  let schema = {
    name: Joi.string()
      .min(3)
      .required()
  };
  return Joi.validate(genre, schema);
}

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port} ...`);
});
