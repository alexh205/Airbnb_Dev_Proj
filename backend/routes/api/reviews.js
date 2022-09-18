const express = require("express");

// Validation
const { validateSpot, reviewValidation } = require("../../utils/validation");

// Models
const { User, Spot, Review, Image } = require("../../db/models");

// Authentication
const { requireAuth } = require("../../utils/auth");

const router = express.Router();

/**********************************************************************************/
//! Edit a Review

router.put("/:reviewId", requireAuth, reviewValidation, async (req, res) => {
  const { review, stars } = req.body;

  const reviewToEdit = await Review.findOne({
    where: { id: req.params.reviewId },
  });

  if (!reviewToEdit) {
    return res.status(404).json({
      message: "Review couldn't be found",
      statusCode: 404,
    });
  }

  if (req.user.id === reviewToEdit.userId) {
    await reviewToEdit.update({
      review: review,
      stars: stars,
    });
  } else {
    return res.status(403).json({
      message: "Unauthorized - only review owner can edit this review",
      statusCode: "403",
    });
  }

  return res.json(reviewToEdit);
});

/**********************************************************************************/
//! Delete a Review

router.delete("/:reviewId", requireAuth, async (req, res) => {
  const deleteReview = await Review.findOne({
    where: { id: req.params.reviewId },
  });

  if (!deleteReview) {
    return res.status(404).json({
      message: "Review couldn't be found",
      statusCode: 404,
    });
  }

  if (req.user.id === deleteReview.userId) {
    await deleteReview.destroy();
    return res.json({
      message: "Successfully deleted",
      statusCode: 200,
    });
  } else {
    return res.status(403).json({
      message: "Unauthorized - only review owner can delete this review",
      statusCode: "403",
    });
  }
});

/**********************************************************************************/
//! Get all Reviews of the Current User

router.get("/current", requireAuth, async (req, res) => {
  const currUserReviews = await Review.findAll({
    where: { userId: req.user.id },
    include: [
      {
        model: User,
        attributes: ["id", "firstName", "lastName"],
        required: false,
      },
      {
        model: Spot,
        attributes: { exclude: ["createdAt", "updatedAt"] },
        required: false,
      },
      {
        model: Image,
        required: false,
        as: "ReviewImages",
        where: { imageableType: "Review" },
        attributes: ["id", "url"],
      },
    ],
  });

  res.json({ Reviews: currUserReviews });
});

/**********************************************************************************/
//! Add an Image to a Review based on the Review's id

router.post("/:reviewId/images", requireAuth, async (req, res) => {
  const currentReview = await Review.findOne({
    where: { id: req.params.reviewId },
  });

  if (!currentReview) {
    return res.status(404).json({
      message: "Review couldn't be found",
      statusCode: "404",
    });
  }

  if (req.user.id !== currentReview.userId) {
    return res.status(403).json({
      message: "Unauthorized - only review owner can add an image",
      statusCode: "403",
    });
  }

  const images = await Image.findAll({
    where: [{ imageableType: "Review" }, { imageableId: currentReview.id }],
  });

  if (images.length >= 10) {
    return res.status(403).json({
      message: "Maximum number of images for this resource was reached",
      statusCode: "403",
    });
  }

  const newImage = await Image.create({
    imageableId: currentReview.id,
    imageableType: "Review",
    url: req.body.url,
  });

  const { id, url } = newImage;

  return res.json({ id, url });
});

module.exports = router;
