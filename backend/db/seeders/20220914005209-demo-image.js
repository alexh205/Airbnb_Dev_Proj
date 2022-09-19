"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.bulkInsert(
      "Images",
      [
        {
          imageableId: 1,
          imageableType: "Spot",
          url: "some spot/image_1",
          userId: 1,
        },
        {
          imageableId: 1,
          imageableType: "Spot",
          url: "some spot/image_2",
          userId: 1,
        },
        {
          imageableId: 2,
          imageableType: "Spot",
          url: "some spot/image_3",
          userId: 2,
        },
        {
          imageableId: 3,
          imageableType: "Spot",
          url: "some spot/image_4",
          userId: 3,
        },
        {
          imageableId: 1,
          imageableType: "User",
          url: "Person/image_5",
          userId: 1,
        },
        {
          imageableId: 2,
          imageableType: "User",
          url: "Person/image_6",
          userId: 2,
        },
        {
          imageableId: 1,
          imageableType: "Review",
          url: "sunny Day/image_7",
          userId: 3,
        },
        {
          imageableId: 2,
          imageableType: "Review",
          url: "cloudy day/image_8",
          userId: 2,
        },
        {
          imageableId: 2,
          imageableType: "Review",
          url: "Bright day/image_9",
          userId: 2,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.bulkDelete("Images", {});
  },
};
