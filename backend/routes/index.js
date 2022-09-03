const express = require("express");
const router = express.Router();

router.get("/api/csrf/restore", (req, res) => {
  res.cookie("XSRF-TOKEN", req.csrfToken());
  const csrfToken = req.csrfToken();
  res.cookie("XSRF-TOKEN", csrfToken);
  res.status(200).json({
    "XSRF-Token": csrfToken,
  });
});

module.exports = router;