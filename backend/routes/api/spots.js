const express = require("express");

// Validation
const { validateSpot } = require("../../utils/validation");

// Models
const { User, Spot, Review, Image } = require("../../db/models");

// Authentication
const { requireAuth, restoreUser } = require("../../utils/auth");

const router = express.Router();

/**********************************************************************************/
//! Get all spots

router.get("/", async (req, res) => {
  const spots = await Spot.findAll();

  for (let spot of spots) {
    const { id } = spot;

    //* Ratings
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

    //* Images
    const previewImage = [];

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
  });

  if (!currentSpot) {
    return res.status(404).json({
      message: "Spot couldn't be found",
      statusCode: 404,
    });
  }

  //* Ratings
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

  //* Images
  let imagesList = [];

  const imagesCurrSpot = await Image.findAll({
    where: { imageableType: "Spot", imageableId: req.params.spotId },
    attributes: ["id", "url"],
  });

  imagesCurrSpot.forEach((image) => {
    image = image.toJSON();

    imagesList.length > 0 && imagesList[0]
      ? (imagesList[0].preview = true)
      : (imagesList.preview = false);

    imagesList.push(image);
  });

  currentSpot.dataValues.SpotImages = imagesList;

  //* Owner
  const spotOwner = await User.findOne({
    where: { Id: currentSpot.ownerId },
    attributes: ["id", "firstName", "lastName"],
  });

  currentSpot.dataValues.Owner = spotOwner;

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

  //* Owner's Authentication
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

  //* Reviews
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
    //* Ratings
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

    //* Images
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

/**********************************************************************************/
//! Add an Image based on a spotId

router.post("/:spotId/images", requireAuth, async (req, res) => {
  const currentSpot = await Spot.findOne({
    where: { id: req.params.spotId },
  });

  if (!currentSpot) {
    return res.status(404).json({
      message: "Spot couldn't be found",
      statusCode: 404,
    });
  }
  if (currentSpot.dataValues.ownerId !== req.user.id) {
    return res.status(403).json({
      message: "Unauthorized",
      statusCode: 403,
    });
  }

  //* new Image
  let newImage = await Image.create({
    imageableId: currentSpot.id,
    imageableType: "Spot",
    url: req.body.url,
  });

  if (req.body.previewImage === true && req.body.previewImage) {
    newImage.dataValues.preview = true;
  } else {
    newImage.dataValues.preview = false;
  }

  newImage = newImage.toJSON();
  const { id, url, preview } = newImage;

  return res.json({ id, url, preview });
});

module.exports = router;
