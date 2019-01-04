const express = require("express");
const router = express.Router();
const { validate, Movie } = require("../models/movies");
const { Genre } = require("../models/genres"); //  {genreSchema} is equivalent to genreSchema.genreSchema

router.get("/", async (req, res) => {
  const movie = await Movie.find().sort("name");
  console.log(movie);
  if (!movie)
    return res.status(404).send("The movie with this record was not found");
  res.send(movie);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

//   const genre = await Genre.findById(req.body.genreId);
//   if (!genre) return res.status(400).send("Invalid genre.");
  let movie = new Movie({
    title: req.body.title,
    // genre: {
    //   _id: genre._id,
    //   name: genre.name
    // },
    genre : new Genre({ name: req.body.genre }),
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate
  });
  movie = await movie.save();
  console.log(movie);
  res.send(movie);
});

router.put("/:id", async (req, res) => {
  const movie = await Movie.findById(req.params.id);
  if (!movie) return res.status(404).send("Record not found");
  //   const result = await Movie.findByIdAndUpdate(req.params.id , {
  //       $set:{
  //           'genre.name':req.body.genre
  //       }
  //   },{new:true});
  movie.genre.name = req.body.name;
  movie.save();
  console.log(movie);
  res.send(movie);
});

module.exports = router;
