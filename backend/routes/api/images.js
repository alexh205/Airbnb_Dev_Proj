const express = require("express");

//? Authentication
const { requireAuth } = require("../../utils/auth");

//? Models
const { User, Image, Spot, Review } = require("../../db/models");

const router = express.Router();

/**********************************************************************************/
//! Delete Image

router.delete("/:imageId", requireAuth, async (req, res) => {


});

module.exports = router;
