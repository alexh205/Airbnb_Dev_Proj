const express = require("express");
const {
  handleValidationErrors,
  validateSpot,
} = require("../../utils/validation");

const {
  User,
  Spot,
  Review,
  Image,
  Booking,
  sequelize,
} = require("../../db/models");
const {
  requireAuth,
  setTokenCookie,
  restoreUser,
} = require("../../utils/auth");
const { check } = require("express-validator");

const router = express.Router();

/**********************************************************************************/
//! Get all spots

router.get("/", async (req, res) => {
  const spots = await Spot.findAll();

  for (let spot of spots) {
    const { id } = spot;

    //* Rating
    const starRating = await Review.findAll({
      where: {
        spotId: id,
      },
    });
    const numReviews = starRating.length;
    let ratingTotal = 0;
    starRating.forEach((review) => {
      if (review.stars) ratingTotal += review.stars;
    });
    let avgRating;
    ratingTotal > 0
      ? (avgRating = Math.round((ratingTotal / numReviews) * 10) / 10)
      : (avgRating = 0);

    spot.dataValues.avgRating = avgRating;

    //* Image
    let previewImage = [];
    const spotPhoto = await spot.getSpotImages({ raw: true });

    for (let photo of spotPhoto) {
      if (photo.imageableId === id) previewImage.push(photo.url);
    }
    previewImage.length > 0
      ? (spot.dataValues.previewImage = previewImage[0])
      : (spot.dataValues.previewImage = null);
  }

  return res.json({
    Spots: spots,
  });
});

/**********************************************************************************/
//! create a spot
router.post("/", requireAuth, validateSpot, async (req, res) => {
  const { address, city, state, country, lat, lng, name, description, price } =
    req.body;

  const newSpot = await Spot.create({
    ownerId: req.user.id,
    address: address,
    city: city,
    state: state,
    country: country,
    lat: lat,
    lng: lng,
    name: name,
    description: description,
    price: price,
  });

  return res.status(201).json(newSpot);
});

/**********************************************************************************/
//! Edit a spot

router.put("/:spotId", requireAuth, validateSpot, async (req, res) => {
  const { address, city, state, country, lat, lng, name, description, price } =
    req.body;

  const editedSpot = await Spot.findByPk(req.params.spotId);

  if (!editedSpot) {
    return res.status(404).json({
      message: "Spot couldn't be found",
      statusCode: 404,
    });
  }

  if (req.user.id !== editedSpot.ownerId) {
    return res.status(403).json({ message: "Unauthorized", statusCode: "403" });
  }

  await editedSpot.update({
    address: address,
    city: city,
    state: state,
    country: country,
    lat: lat,
    lng: lng,
    name: name,
    description: description,
    price: price,
  });

  return res.json(editedSpot);
});

/**********************************************************************************/
//! Get spot by spot id

router.get("/:spotId", async (req, res) => {
  const currentSpot = await Spot.findOne({
    where: { id: req.params.spotId },
    include: [
      {
        model: Image,
        as: "SpotImages",
        attributes: ["id", "url"],
      },
      {
        model: User,
        as: "Owner",
        attributes: ["id", "firstName", "lastName"],
      },
    ],
  });

  if (!currentSpot) {
    return res.status(404).json({
      message: "Spot couldn't be found",
      statusCode: 404,
    });
  }

  //* rating
  const currentReview = await Review.findAll({
    where: {
      spotId: req.params.spotId,
    },
  });

  const numReviews = currentReview.length;
  let ratingTotal = 0;
  currentReview.forEach((review) => {
    if (review.stars) ratingTotal += review.stars;
  });
  let avgRating;
  ratingTotal > 0
    ? (avgRating = Math.round((ratingTotal / numReviews) * 10) / 10)
    : (avgRating = 0);

  currentSpot.dataValues.numReviews = numReviews;
  currentSpot.dataValues.avgStarRating = avgRating;

  return res.json(currentSpot);
});

/**********************************************************************************/
//! Delete a spot

router.delete("/:spotId", requireAuth, async (req, res) => {
  const currentSpot = await Spot.findByPk(req.params.spotId);

  if (!currentSpot) {
    return res.status(404).json({
      message: "Spot couldn't be found",
      statusCode: 404,
    });
  }

  const spotOwner = currentSpot.ownerId;

  if (spotOwner === req.user.id) {
    await currentSpot.destroy();
    return res.json({ message: "Successfully deleted", statusCode: 200 });
  } else {
    return res.status(403).json({
      message: "Unauthorized",
      statusCode: 403,
    });
  }
});

/**********************************************************************************/
//! Get all reviews for a spot

router.get("/:spotId/reviews", async (req, res) => {
  const currentSpot = await Spot.findByPk(req.params.spotId);

  if (!currentSpot) {
    return res
      .status(404)
      .json({ message: "Spot couldn't be found", statusCode: 404 });
  }

  const reviews = await Review.findAll({
    where: { spotId: req.params.spotId },
    include: [
      {
        model: User,
        attributes: ["id", "firstName", "lastName"],
      },
      {
        model: Image,
        as: "ReviewImages",
        where: { imageableType: "Review" },
        attributes: ["id", "url"],
      },
    ],
  });

  return res.json({ Reviews: reviews });
});

/**********************************************************************************/
//! Get all spots for the current user

router.get("/profile/current", restoreUser, requireAuth, async (req, res) => {

  const currSpot = await Spot.findAll({
    where: { ownerId: req.user.id },
  });

  for (let spot of currSpot) {
    const starRating = await Review.findAll({
      where: {
        spotId: spot.id,
      },
    });

    const numReviews = starRating.length;
    let ratingTotal = 0;
    starRating.forEach((review) => {
      if (review.stars) ratingTotal += review.stars;
    });
    let avgRating;
    ratingTotal > 0
      ? (avgRating = Math.round((ratingTotal / numReviews) * 10) / 10)
      : (avgRating = 0);

    spot.dataValues.avgRating = avgRating;

    //* Image
    let previewImage = [];
    const spotPhoto = await spot.getSpotImages({ raw: true });

    for (let photo of spotPhoto) {
      if (photo.imageableId === id) previewImage.push(photo.url);
    }
    previewImage.length > 0
      ? (spot.dataValues.previewImage = previewImage[0])
      : (spot.dataValues.previewImage = null);
  }

  return res.json(currSpot);
});

module.exports = router;
