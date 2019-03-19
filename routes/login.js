const express = require("express");
const User = require("../models/users");
const { comparePassword } = require("../utils");

const router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("login", { title: "My Auth Test" });
});

router.post("/", async function(req, res, next) {
  console.log(req.body);
  const user = await User.findOne({ email: req.body.email });
  console.log("user", user);
  if (user) {
    const match = await comparePassword(req.body.password, user.password);
    if (match) {
      req.session.user = user;
      return res.render("index", { title: "Login successful" });
    }
    return res.render("index", {
      title: "Login unsuccessful, passwords do not match"
    });
  }
  res.render("index", { title: "Error logging in" });
});

module.exports = router;
