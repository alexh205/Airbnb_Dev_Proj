"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.bulkInsert(
      "Reviews",
      [
        { userId: 2, spotId: 1, review: "This was an awesome spot!", stars: 5 },
        {
          userId: 3,
          spotId: 1,
          review: "The spot was not to our expectation",
          stars: 1,
        },
        { userId: 2, spotId: 3, review: "Will stay here again!", stars: 4 },
        {
          userId: 2,
          spotId: 2,
          review: "The place was spotless and comfortable",
          stars: 5,
        },
        {
          userId: 4,
          spotId: 1,
          review: "I would come back to this spot again!",
          stars: 4,
        },
        {
          userId: 2,
          spotId: 4,
          review: "I would come back to this spot again!",
          stars: 5,
        },
        {
          userId: 1,
          spotId: 3,
          review: "I would come back to this spot again!",
          stars: 2,
        },
        {
          userId: 3,
          spotId: 4,
          review: "I am not sure about this place!",
          stars: 2,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.bulkDelete("Reviews", {});
  },
};
