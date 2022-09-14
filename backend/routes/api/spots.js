const express = require("express");
const { handleValidationErrors } = require("../../utils/validation");

const {
  User,
  Spot,
  Review,
  Image,
  Booking,
  sequelize,
} = require("../../db/models");
const { requireAuth } = require("../../utils/auth");
const { check } = require("express-validator");

const router = express.Router();

const validateSpot = [
  check("address")
    .exists({ checkFalsy: true })
    .isString()
    .withMessage("Street address is required"),
  check("city")
    .exists({ checkFalsy: true })
    .isString()
    .withMessage("City is required"),
  check("state")
    .exists({ checkFalsy: true })
    .isString()
    .withMessage("State is required"),
  check("country")
    .exists({ checkFalsy: true })
    .isString()
    .withMessage("Country is required"),
  check("lat")
    .exists({ checkFalsy: true })
    .isFloat()
    .withMessage("Latitude is not valid"),
  check("lng")
    .exists({ checkFalsy: true })
    .isFloat()
    .withMessage("Longitude is not valid"),
  check("name")
    .exists({ checkFalsy: true })
    .isString()
    .isLength({ max: 50 })
    .withMessage("Name must be less than 50 characters"),
  check("description")
    .exists({ checkFalsy: true })
    .isString()
    .withMessage("Description is required"),
  check("price")
    .exists({ checkFalsy: true })
    .isNumeric()
    .withMessage("Price per day is required"),
  handleValidationErrors,
];


// Get all spots
router.get("/", async (req, res) => {
  const spots = await Spot.findAll();

  for (let spot of spots) {
    const { id } = spot;

    // rating
    const starRating = await Review.findAll({
      where: {
        spotId: id,
      },
    });
    const numReviews = starRating.length;
    let ratingTotal = 0;
    starRating.forEach((review) => {
      if (review.stars) {
        ratingTotal += review.stars;
      }
    });
    let avgRating;
    if (ratingTotal > 0) {
      avgRating = Math.round((ratingTotal / numReviews) * 10) / 10;
    } else {
      avgRating = 0;
    }

    spot.dataValues.avgRating = avgRating;

    // image
    let previewImage = [];
    const spotPhoto = await spot.getImages({ raw: true });

    for (let photo of spotPhoto) {
      if (photo.imageableId === id) {
        previewImage.push(photo.url);
      }
    }
    if (previewImage.length > 0) {
      spot.dataValues.previewImage = previewImage[0];
    } else {
      spot.dataValues.previewImage = null;
    }
    
  }

  return res.json({
    Spots: spots,
  });
});

// create a spot
router.post("/", requireAuth, validateSpot, async (req, res) => {
  const { address, city, state, country, lat, lng, name, description, price } =
    req.body;

  const newSpot = await Spot.create({
    hostId: req.user.id,
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

// edit a spot
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

// Get spot by spot id
router.get("/:spotId", async (req, res) => {
  const spots = await Spot.findAll();

  for (let spot of spots) {
    const { id } = spot;

    // rating
    const starRating = await Review.findAll({
      where: {
        spotId: id,
      },
    });
    const numReviews = starRating.length;
    let ratingTotal = 0;
    starRating.forEach((review) => {
      if (review.stars) {
        ratingTotal += review.stars;
      }
    });
    let avgRating;
    if (ratingTotal > 0) {
      avgRating = Math.round((ratingTotal / numReviews) * 10) / 10;
    } else {
      avgRating = 0;
    }

    spot.dataValues.avgRating = avgRating;

    // image
    let previewImage = [];
    const spotPhoto = await spot.getImages({ raw: true });

    for (let photo of spotPhoto) {
      if (photo.imageableId === id) {
        previewImage.push(photo.url);
      }
    }
    if (previewImage.length > 0) {
      spot.dataValues.previewImage = previewImage[0];
    } else {
      spot.dataValues.previewImage = null;
    }

  }

  return res.json({
    Spots: spots,
  });
});

// create a spot
router.post("/", requireAuth, validateSpot, async (req, res) => {
  const { address, city, state, country, lat, lng, name, description, price } =
    req.body;

  const newSpot = await Spot.create({
    hostId: req.user.id,
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



// Delete a spot

router.delete("/:spotId", requireAuth, async (req, res) => {
  const currentSpot = await Spot.findByPk(req.params.spotId);
  const currentOwner = currentSpot.ownerId;

  if (!currentSpot) {
    return res.status(404).json({
      message: "Spot couldn't be found",
      statusCode: 404,
    });
  }

  if (currentOwner === req.user.id) {
    await currentSpot.destroy();
    return res.json({ message: "Successfully deleted", statusCode: 200 });
  } else {
    return res.json({
      message: "Not Authorized to delete current spot",
    });
  }
});

// get all reviews for a spot

router.get("/:spotId/reviews", async (req, res) => {
  const currentSpot = await Spot.findByPk(req.params.spotId);

  if (!currentSpot) {
    res.status(404);
    return res.json({ message: "Spot couldn't be found", statusCode: 404 });
  }

  const reviews = await Review.findAll({
    where: { spotId: currentSpot.spotId },
    include: [
      {
        model: User,
        attributes: ["id", "firstName", "lastName"],
      },
      {
        model: Image,
        where: { imageType: "spot" },
        attributes: ["id", "url"],
      },
    ],
  });

  return res.json({ Reviews: reviews });
});

module.exports = router;
