const { validate, Rental } = require("../models/rentals");
const { Customer } = require("../models/customer");
const { Movie } = require("../models/movies");
const express = require("express");
const router = express.Router();
const Fawn = require("fawn");
const mongoose = require("mongoose");

Fawn.init(mongoose);

router.get("/", async (req, res) => {
  const rental = await Rental.find().sort("-dateOut");
  res.send(rental);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const customer = await Customer.findById(req.body.customerId);
  if (!customer) return res.status(400).send("Invalid Customer");
  console.log("customer", customer);

  const movie = await Movie.findById(req.body.movieId);
  if (!movie) return res.status(400).send("Invalid movie");
  console.log("movie", movie);

  if (movie.numberInStock === 0)
    return res.status(400).send("Movie not in Stock");

  let rental = new Rental({
    customer: {
      _id: customer._id,
      name: customer.name,
      phone: customer.phone
    },
    movie: {
      _id: movie._id,
      title: movie.title,
      dailyRentalRate: movie.dailyRentalRate
    }
  });
  //  2 operation which can't commit both are success or failuer thatswhy we use transaction (relation DB)or 2 phase commit (MongoDB) concept and  thir party library name is FAWN
  //   rental = await rental.save();
  //   movie.numberInStock--;
  //   movie.save()

  try {
    new Fawn.Task() // Transaction or 2 phase commit used by Fawn
      .save("rentals", rental)
      .update(
        "movies",
        { _id: movie._id },
        {
          $inc: { numberInStock: -1 }
        }
      )
      .run();
    console.log(rental);
    res.send(rental);
  } catch (ex) {
    res.status(500).send("Something failed.");
  }
});

router.put("/:id", async (req, res) => {
  const rental = await Rental.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        "customer.name": req.body.customerName,
        "movie.title": req.body.movieName
      }
    },
    { new: true }
  );
  if (!rental) return res.status(404).send("Record not found");
  res.send(rental);
});

router.delete("/:id", async (req, res) => {
  const rental = await Rental.findByIdAndRemove({ _id: req.params.id });
  if (!rental) return res.status(404).send("Record not found");

  res.send(rental);
});

router.get("/:id", async (req, res) => {
  const rental = await Rental.findById(req.params.id);
  if(!rental) return res.status(404).send("Record not found");

  res.send(rental)
});

module.exports = router;
