"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.bulkInsert(
      "Images",
      [
        {
          imageableId: 1,
          imageableType: "Spot",
          url: "https://images.unsplash.com/photo-1601918774946-25832a4be0d6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1738&q=80",
          userId: 1,
        },
        {
          imageableId: 1,
          imageableType: "Spot",
          url: "https://images.unsplash.com/photo-1576874748772-584aa2bee2d4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2574&q=80",
          userId: 1,
        },
        {
          imageableId: 2,
          imageableType: "Spot",
          url: "https://images.unsplash.com/photo-1605272058466-5988743ff1db?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80",
          userId: 2,
        },
        {
          imageableId: 2,
          imageableType: "Spot",
          url: "https://images.unsplash.com/photo-1607582544956-a874e6740135?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
          userId: 2,
        },
        {
          imageableId: 3,
          imageableType: "Spot",
          url: "https://images.unsplash.com/photo-1615354310157-c78b1be66eed?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80",
          userId: 3,
        },
        {
          imageableId: 4,
          imageableType: "Spot",
          url: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80",
          userId: 1,
        },
        {
          imageableId: 4,
          imageableType: "Spot",
          url: "https://images.unsplash.com/photo-1523192193543-6e7296d960e4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
          userId: 1,
        },
        {
          imageableId: 1,
          imageableType: "User",
          url: "https://images.unsplash.com/photo-1614502875832-77fe801288ba?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=970&q=80",
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
