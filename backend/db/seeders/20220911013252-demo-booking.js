"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.bulkInsert(
      "Bookings",
      [
        {
          userId: 2,
          spotId: 1,
          startDate: new Date("2022-10-22"),
          endDate: new Date("2022-10-23"),
          guestsNum: 2,
        },
        {
          userId: 1,
          spotId: 3,
          startDate: new Date("2022-11-02"),
          endDate: new Date("2022-11-05"),
          guestsNum: 3,
        },
        {
          userId: 1,
          spotId: 1,
          startDate: new Date("2022-11-07"),
          endDate: new Date("2022-11-09"),
          guestsNum: 1,
        },
        {
          userId: 3,
          spotId: 2,
          startDate: new Date("2022-11-10"),
          endDate: new Date("2022-11-12"),
          guestsNum: 4,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.bulkDelete("Bookings", {});
  },
};
