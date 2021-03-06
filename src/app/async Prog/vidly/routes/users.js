const auth = require("../middleware/auth");
const bcrypt = require("bcrypt");
const { validate, User } = require("../models/user");
const express = require("express");
const router = express.Router();
const _ = require("lodash");

router.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.user._id)
  .select("-password");
  res.send(user)
});

router.post("/", async (req, res) => { // Register User
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registered.");

  // user = new User({ this approach is good but we'll prefer lodash
  //   name: req.body.name,
  //   email: req.body.email,
  //   password: req.body.password
  // });
  user = new User(_.pick(req.body, ["name", "email", "password"]));

  const token = user.generateAuthToken();
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  // user.token = token
  await user.save();

  // res.send({ this approach is good but we'll prefer lodash
  //   name:user.name,
  //   email:user.email
  // });
  res
    .header("x-auth-token", token)
    .send(_.pick(user, ["_id", "name", "email"])); //  Lodash
});

module.exports = router;
