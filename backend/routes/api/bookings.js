const express = require("express");

//? Authentication
const { requireAuth } = require("../../utils/auth");

//? Models
const { User, Image, Spot, Booking } = require("../../db/models");

const router = express.Router();

/**********************************************************************************/
//! Get all of the current user's Bookings

router.get("/current", requireAuth, async (req, res) => {
  const userBookings = await Booking.findAll({
    where: { userId: req.user.id },
    include: [
      {
        model: Spot,
        required: false,
        attributes: {
          include: [
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
      },
    ],
  });

  return res.json(userBookings);
});

/**********************************************************************************/
//! Delete Booking

router.delete("/:bookingId", requireAuth, async (req, res) => {
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
});

module.exports = router;
