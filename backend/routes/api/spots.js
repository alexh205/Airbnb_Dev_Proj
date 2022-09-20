const express = require("express");

//? Validation
const {
  validateSpot,
  filterQueryValidator,
  reviewValidation,
  bookingValidation,
} = require("../../utils/validation");

//? Models
const { User, Spot, Review, Image, Booking } = require("../../db/models");

//? Authentication
const { requireAuth, restoreUser } = require("../../utils/auth");

const router = express.Router();
const { Op } = require("sequelize");

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
//! Create an Image for a spotId

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
    userId: req.user.id,
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

/**********************************************************************************/
//! Create a Review for a Spot based on the Spot's id

router.post(
  "/:spotId/reviews",
  requireAuth,
  reviewValidation,
  async (req, res) => {
    const spot = await Spot.findByPk(req.params.spotId);

    if (!spot) {
      return res.status(404).json({
        message: "Spot couldn't be found",
        statusCode: 404,
      });
    }

    const spotReviews = await Review.findAll({
      where: { spotId: req.params.spotId },
    });

    for (let spotReview of spotReviews) {
      if (spotReview.userId === req.user.id) {
        return res.status(403).json({
          message: "User already has a review for this spot",
          statusCode: 403,
        });
      }
    }

    const { review, stars } = req.body;
    const newReview = await Review.create({
      userId: req.user.id,
      spotId: req.params.spotId,
      review: review,
      stars: stars,
    });

    return res.status(201).json(newReview);
  }
);

/**********************************************************************************/
//! Create a Booking from a spotId

router.post(
  "/:spotId/bookings",
  requireAuth,
  bookingValidation,
  async (req, res) => {
    const bookingSpot = await Spot.findByPk(req.params.spotId);

    if (!bookingSpot) {
      return res
        .status(404)
        .json({ message: "Spot couldn't be found", statusCode: 404 });
    }

    if (bookingSpot.ownerId === req.user.id) {
      return res.status(403).json({
        message: "Unauthorized - you can't book your own property",
        statusCode: 403,
      });
    }

    const firstDate = Date.parse(req.body.startDate);
    const lastDate = Date.parse(req.body.endDate);

    if (firstDate > lastDate) {
      return res.status(400).json({
        message: "Validation error",
        statusCode: 400,
        errors: {
          endDate: "endDate cannot be on or before startDate",
        },
      });
    }

    const bookingCheck = await Booking.findAll({
      where: [
        { spotId: req.params.spotId },
        { startDate: { [Op.lt]: req.body.endDate } },
        { endDate: { [Op.gt]: req.body.startDate } },
      ],
    });

    if (bookingCheck.length > 0) {
      return res.status(403).json({
        message: "Sorry, this spot is already booked for the specified dates",
        statusCode: 403,
        errors: {
          startDate: "Start date conflicts with an existing booking",
          endDate: "End date conflicts with an existing booking",
        },
      });
    }

    const newBooking = await Booking.create({
      userId: req.user.id,
      spotId: req.params.spotId,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      guestsNum: req.body.guestsNum || 2,
    });

    const { id, spotId, userId, startDate, endDate, updatedAt, createdAt } =
      newBooking;

    return res.json({
      id,
      spotId,
      userId,
      startDate,
      endDate,
      createdAt,
      updatedAt,
    });
  }
);

/**********************************************************************************/
//! Get all reviews by a spotId

router.get("/:spotId/reviews", async (req, res) => {
  const currentSpot = await Spot.findByPk(req.params.spotId, {
    include: [{ model: Review }],
  });

  if (!currentSpot) {
    return res
      .status(404)
      .json({ message: "Spot couldn't be found", statusCode: 404 });
  }

  //* Reviews
  const reviews = await Review.findAll({
    where: { spotId: currentSpot.id },
    include: [
      {
        model: User,
        attributes: ["id", "firstName", "lastName"],
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

  if (!reviews.length) {
    return res.status(404).json({
      message: "No reviews could be found for the current spot",
      statusCode: 404,
    });
  }

  return res.json({ Reviews: reviews });
});

/**********************************************************************************/
//! Get all Bookings for a Spot based on the Spot's id

router.get("/:spotId/bookings", requireAuth, async (req, res) => {
  const spot = await Spot.findByPk(req.params.spotId);

  if (!spot) {
    return res
      .status(404)
      .json({ message: "Spot couldn't be found", statusCode: 404 });
  }

  let spotBookings;

  if (spot.ownerId !== req.user.id) {
    spotBookings = await Booking.findAll({
      where: { spotId: req.params.spotId },
      attributes: ["spotId", "startDate", "endDate"],
    });
  } else {
    spotBookings = await Booking.findAll({
      where: { spotId: req.params.spotId },
      include: [
        {
          model: User,
          attributes: {
            exclude: [
              "username",
              "email",
              "hashedPassword",
              "createdAt",
              "updatedAt",
            ],
          },
        },
      ],
    });
  }

  if (!spotBookings.length) {
    return res.status(404).json({
      message: "No bookings could be found for the current spot",
      statusCode: 404,
    });
  }

  return res.json({ Bookings: spotBookings });
});

/**********************************************************************************/
//! Get all spots by query filters

router.get("/search", filterQueryValidator, async (req, res) => {
  const { maxLat, minLat, minLng, maxLng, minPrice, maxPrice } = req.query;

  const query = {
    where: {},
  };

  //* Page filters
  let page = req.query.page;
  !page ? (page = 0) : (page = page);

  //* Size filters
  let size = req.query.size;
  !size ? (size = 20) : (size = size);

  //* Limit & Offset parameters
  if (page >= 0 && size >= 0) {
    query.limit = size;
    query.offset = size * (page - 1);
  }

  //* Latitude filters
  if (minLat && maxLat) {
    query.where.lat = { [Op.lt]: req.query.maxLat, [Op.gt]: req.query.minLat };
  } else if (minLat && !maxLat) {
    query.where.lat = {
      [Op.gt]: req.query.minLat,
    };
  } else if (!minLat && maxLat) {
    query.where.lat = {
      [Op.lt]: req.query.maxLat,
    };
  }

  //* Longitude filters
  if (minLng && maxLng) {
    query.where.lng = { [Op.lt]: req.query.maxLng, [Op.gt]: req.query.minLng };
  } else if (minLng && !maxLng) {
    query.where.lng = {
      [Op.gt]: req.query.minLng,
    };
  } else if (!minLng && maxLng) {
    query.where.lng = {
      [Op.lt]: req.query.maxLng,
    };
  }

  //* Price filters
  if (minPrice && maxPrice) {
    query.where.price = {
      [Op.lt]: req.query.maxPrice,
      [Op.gt]: req.query.minPrice,
    };
  } else if (minPrice && !maxPrice) {
    query.where.price = {
      [Op.gt]: req.query.minPrice,
    };
  } else if (!minPrice && maxPrice) {
    query.where.price = {
      [Op.lt]: req.query.maxPrice,
    };
  }

  //* Query for all the spots
  const spots = await Spot.findAll(query);

  for (let spot of spots) {
    const { id } = spot;

    //* previewImages
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
    spots,
    page: page,
    size: size,
  });
});

/**********************************************************************************/
//! Get all spots for the current user

router.get("/current", restoreUser, requireAuth, async (req, res) => {
  const currSpot = await Spot.findAll({
    where: { ownerId: req.user.id },
  });

  if (!currSpot.length) {
    return res.status(404).json({
      message: "No spots can be found for the current user",
      statusCode: 404,
    });
  }

  for (let spot of currSpot) {
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
    let previewImage = [];

    const spotPhoto = await spot.getSpotImages();

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

module.exports = router;
