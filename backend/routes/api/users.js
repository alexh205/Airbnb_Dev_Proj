const express = require("express");

const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User } = require("../../db/models");

const {
  validateSignup,
} = require("../../utils/validation");

const router = express.Router();

// Sign up
router.post("/", validateSignup, async (req, res) => {
  const { firstName, lastName, email, password, username } = req.body;
  const user = await User.signup({
    firstName,
    lastName,
    email,
    password,
    username,
  });

  await setTokenCookie(res, user);

  return res.json({
    user,
  });
});
module.exports = router;
