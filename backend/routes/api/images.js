const express = require("express");

//? Authentication
const { requireAuth } = require("../../utils/auth");

//? Models
const { User, Image, Spot, Review } = require("../../db/models");

const router = express.Router();

/**********************************************************************************/
//! Delete Image

router.delete("/:imageId", requireAuth, async (req, res) => {
  const currImage = await Image.findByPk(req.params.imageId);
  console.log(currImage);

  if (!currImage) {
    return res
      .status(404)
      .json({ message: "image couldn't be located", statusCode: 404 });
  }

  if (req.user.id !== currImage.userId) {
    return res.status(403).json({
      message: "Unauthorized - only owner can delete this image",
      statusCode: 403,
    });
  } else {
    await currImage.destroy();
    return res.json({ message: "Successfully deleted", statusCode: 200 });
  }
});

module.exports = router;
