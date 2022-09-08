const express = require("express");

const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User } = require("../../db/models");

const router = express.Router();

// Sign up
router.post("/", async (req, res) => {
  const { firstName, lastName, email, password, username, isHost } = req.body;
  const user = await User.signup({
    firstName,
    lastName,
    email,
    password,
    username,
    isHost,
  });

  await setTokenCookie(res, user);

  return res.json({
    user,
  });
});
module.exports = router;
