const express = require("express");

//? Authentication
const { requireAuth } = require("../../utils/auth");

const { bookingIdValidation } = require("../../utils/validation");

//? Models
const { User, Image, Spot, Booking } = require("../../db/models");

const { Op } = require("sequelize");

const router = express.Router();

/**********************************************************************************/
//! Get all of the current user's Bookings

router.get("/current", requireAuth, async (req, res) => {
  const userBookings = await Booking.findAll({
    where: { userId: req.user.id },
    attributes: [
      "id",
      "spotId",
      "userId",
      "startDate",
      "endDate",
      "createdAt",
      "updatedAt",
    ],
    include: [
      {
        model: Spot,
        required: false,
        attributes: [
          "id",
          "ownerId",
          "address",
          "city",
          "state",
          "country",
          "lat",
          "lng",
          "name",
          "price",
        ],
      },
    ],
  });

  for (let booking of userBookings) {
    let spotId = booking.dataValues.Spot.dataValues.id;


    //* Images
    let previewImage = [];

    let spotPhoto = await Image.findAll({
      where: [{ imageableId: spotId }, { imageableType: "Spot" }],
    });

    for (let photo of spotPhoto) {
      previewImage.push(photo.url);
    }

    previewImage.length > 0
      ? (booking.dataValues.Spot.dataValues.previewImage = previewImage[0])
      : (booking.dataValues.Spot.dataValues.previewImage = null);
  }

  if (!userBookings.length) {
    return res.status(404).json({
      message: "No bookings can be found for the current user",
      statusCode: 404,
    });
  }

  return res.json({ Bookings: userBookings });
});

/**********************************************************************************/
//! Delete Booking

router.delete(
  "/:bookingId",
  requireAuth,
  bookingIdValidation,
  async (req, res) => {
    const deleteBooking = await Booking.findByPk(req.params.bookingId);

    if (!deleteBooking) {
      return res.status(404).json({
        message: "Booking couldn't be found",
        statusCode: 404,
      });
    }

    const todaysDate = new Date();
    const todaysDateString = Date.parse(todaysDate);
    const firstDate = Date.parse(deleteBooking.startDate);

    if (todaysDateString >= firstDate) {
      res.status(403).json({
        message: "Bookings that have been started can't be deleted",
        statusCode: 403,
      });
    }

    if (deleteBooking.userId !== req.user.id) {
      return res.status(403).json({
        message: "Unauthorized - Only booking owner can delete booking",
        statusCode: 403,
      });
    } else {
      await deleteBooking.destroy();
      return res.json({
        message: "Successfully deleted",
        statusCode: 200,
      });
    }
  }
);

/**********************************************************************************/
//! Edit Booking

router.put(
  "/:bookingId",
  requireAuth,
  bookingIdValidation,
  async (req, res) => {
    const editBooking = await Booking.findByPk(req.params.bookingId);

    if (!editBooking) {
      return res.status(404).json({
        message: "Booking couldn't be found",
        statusCode: 404,
      });
    }

    const todaysDate = new Date();
    const todaysDateString = Date.parse(todaysDate);
    const startDateString = Date.parse(editBooking.startDate);
    const endDateString = Date.parse(editBooking.endDate);

    if (todaysDateString > endDateString) {
      res.status(403).json({
        message: "Past bookings can't be modified",
        statusCode: 403,
      });
    }

    if (startDateString > endDateString) {
      return res.status(400).json({
        message: "Validation error",
        statusCode: 400,
        errors: {
          endDate: "endDate cannot be on or before startDate",
        },
      });
    }

    if (editBooking.userId !== req.user.id) {
      return res.status(403).json({
        message: "Unauthorized - Only booking owner can edit booking",
        statusCode: 403,
      });
    }

    const bookingCheck = await Booking.findAll({
      where: [
        { id: req.params.bookingId },
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

    await editBooking.update({
      startDate: req.body.startDate,
      endDate: req.body.endDate,
    });

    const { id, spotId, userId, startDate, endDate, createdAt, updatedAt } =
      editBooking;

    if (Date.parse(endDate) < Date.parse(startDate)) {
      return res.status(403).json({
        message: "Validation error",
        statusCode: 400,
        errors: {
          endDate: "endDate cannot come before startDate",
        },
      });
    }
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

module.exports = router;
