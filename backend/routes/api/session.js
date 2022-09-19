const express = require("express");

//? Authentication
const {
  setTokenCookie,
  restoreUser,
  requireAuth,
} = require("../../utils/auth");

//? Models
const { User } = require("../../db/models");

//? Validation
const { validateLogin } = require("../../utils/validation");

const router = express.Router();

/**********************************************************************************/
//! Log in
router.post("/", validateLogin, async (req, res, next) => {
  const { credential, password } = req.body;

  const user = await User.login({ credential, password });

  //* User validation
  if (!user) {
    const err = new Error("Login failed");
    err.status = 401;
    err.title = "Login failed";
    err.errors = ["The provided credentials were invalid."];
    return next(err);
  }

  //* Excluding undesired parameters
  const loginUser = await User.findOne({
    where: { id: user.id },
    attributes: { exclude: ["createdAt", "updatedAt", "hashedPassword"] },
  });

  loginUser.dataValues.token = await setTokenCookie(res, user);
  const { firstName, lastName, username, email } = loginUser;

  return res.json({ firstName, lastName, username, email, token: "" });
});

/**********************************************************************************/

//! Log out
router.delete("/", (_req, res) => {
  res.clearCookie("token");
  return res.json({ message: "success" });
});

/**********************************************************************************/

// //! Restore session user
// router.get("/", restoreUser, (req, res) => {
//   const { user } = req;
//   if (user) {
//     return res.json({
//       user: user.toSafeObject(),
//     });
//   } else return res.json({});
// });

/**********************************************************************************/
//! Get current User
router.get("/", restoreUser, requireAuth, async (req, res) => {
  const { user } = req;

  //* Excluding undesired parameters
  const currUser = await User.findOne({
    where: { id: user.id },
    attributes: { exclude: ["createdAt", "updatedAt"] },
  });

  currUser.token = await setTokenCookie(res, user);

  const { id, firstName, lastName, email, username } = currUser;

  res.json({
    id,
    firstName,
    lastName,
    email,
    username,
    token: "",
  });
});

module.exports = router;
