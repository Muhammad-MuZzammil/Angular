const express = require("express");
const Joi = require("joi");
const router = express.Router();

const genres = [
  { id: 1, name: "Horror" },
  { id: 2, name: "Action" },
  { id: 3, name: "Martial Arts" }
];

router.get("/", (req, res) => {
    res.send(genres);
  });

router.post("/", (req, res) => {
  
  let { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let movie = {
    id: genres.length + 1,
    name: req.body.name
  };
  genres.push(movie);
  res.send(genres);
});

router.put("/:id", (req, res) => {
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

router.delete("/:id", (req, res) => {
  const movie = genres.find(m => m.id === parseInt(req.params.id));
  if (!movie) return res.status(404).send("Record not found");
  let index = genres.indexOf(movie);
  genres.splice(index, 1);
  res.send(movie);
});
router.get("/:id", (req, res) => {
  const movie = genres.find(m => m.id === parseInt(req.params.id));
  if (!movie) return res.status(404).send("Record not found");
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

module.exports = router;
