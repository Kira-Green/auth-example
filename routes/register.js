const express = require("express");
const User = require("../models/users");
const router = express.Router();

router.post("/", function(req, res, next) {
  const user = new User(req.body);
  user
    .save()
    .then(() => {
      res.render("index", { title: `Created ${user.firstName} as a user` });
    })
    .catch(err => console.error(err));
});

module.exports = router;
