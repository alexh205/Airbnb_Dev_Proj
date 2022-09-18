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

module.exports = router;
