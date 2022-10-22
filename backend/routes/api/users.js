const express = require("express");

//? Authentication
const { setTokenCookie } = require("../../utils/auth");

//? Models
const { User } = require("../../db/models");

//? Validation
const { validateSignup } = require("../../utils/validation");

const router = express.Router();

/**********************************************************************************/
//! Sign up
router.post("/", validateSignup, async (req, res) => {
  const { firstName, lastName, email, password, username } = req.body;

  //* Email verification
  const emailVerification = await User.findOne({ where: { email } });

  if (emailVerification) {
    return res.status(403).json({
      message: "User already exists",
      statusCode: 403,
      errors: {
        email: "User with that email already exists",
      },
    });
  }

  //* Username verification
  const usernameVerification = await User.findOne({ where: { username } });

  if (usernameVerification) {
    return res.status(403).json({
      message: "User already exists",
      statusCode: 403,
      errors: {
        email: "User with that username already exists",
      },
    });
  }

  //* Creation of a new user
  const user = await User.signup({
    firstName,
    lastName,
    email,
    username,
    password,
  });

  //* Excluding undesired parameters
  const newUser = await User.findOne({
    where: { id: user.id },
    attributes: { exclude: ["createdAt", "updatedAt", "hashedPassword"] },
  });
  newUser.dataValues.token = "";

  return res.json(newUser);
});
module.exports = router;
