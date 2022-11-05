"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.bulkInsert(
      "Images",
      [
        {
          imageableId: 1,
          imageableType: "Spot",
          url: "https://a0.muscache.com/im/pictures/49c4f89b-706e-4e30-aadd-c96ed79e3fdc.jpg?im_w=1200",
          userId: 1,
        },
        {
          imageableId: 1,
          imageableType: "Spot",
          url: "https://a0.muscache.com/im/pictures/a88bbc3f-2d96-45fa-9bdc-295aed081298.jpg?im_w=720",
          userId: 1,
        },
        {
          imageableId: 1,
          imageableType: "Spot",
          url: "https://a0.muscache.com/im/pictures/bfb73ae9-f2f0-425a-b9f5-72ffa6c75641.jpg?im_w=1440",
          userId: 1,
        },
        {
          imageableId: 2,
          imageableType: "Spot",
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-10020282/original/6d1ec8ba-8e20-4d24-b12d-404c201e1438.jpeg?im_w=720",
          userId: 2,
        },
        {
          imageableId: 2,
          imageableType: "Spot",
          url: "https://a0.muscache.com/im/pictures/1acb04c0-b00b-49ae-8858-b722476cbd41.jpg?im_w=1200",
          userId: 2,
        },
        {
          imageableId: 2,
          imageableType: "Spot",
          url: "https://a0.muscache.com/im/pictures/265da448-ce24-43a7-ae56-b40cd1bc00fa.jpg?im_w=1200",
          userId: 2,
        },
        {
          imageableId: 3,
          imageableType: "Spot",
          url: "https://a0.muscache.com/im/pictures/23ea79bd-21eb-4e70-a374-8c46f13e6804.jpg?im_w=720",
          userId: 3,
        },
        {
          imageableId: 3,
          imageableType: "Spot",
          url: "https://a0.muscache.com/im/pictures/4b63a97f-b5fa-40b4-bf0e-c545107b1006.jpg?im_w=720",
          userId: 3,
        },
        {
          imageableId: 3,
          imageableType: "Spot",
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-49924321/original/f0da72bc-28b2-44bd-b3dc-9cb1e1ba946b.jpeg?im_w=1200",
          userId: 3,
        },
        {
          imageableId: 4,
          imageableType: "Spot",
          url: "https://a0.muscache.com/im/pictures/f152e8fc-205b-4ac9-aaf3-cf8c70d993eb.jpg?im_w=720",
          userId: 1,
        },
        {
          imageableId: 4,
          imageableType: "Spot",
          url: "https://a0.muscache.com/im/pictures/b6151e87-bc6a-4cf2-811d-03c99ed7a13d.jpg?im_w=720",
          userId: 1,
        },
        {
          imageableId: 4,
          imageableType: "Spot",
          url: "https://a0.muscache.com/im/pictures/f1c797fb-e65e-4cba-8022-023a329128bf.jpg?im_w=1440",
          userId: 1,
        },
        {
          imageableId: 5,
          imageableType: "Spot",
          url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-633907917135849973/original/6df42c9a-8258-4ebf-9a2f-fa6ebb99acfe.jpeg?im_w=1440",
          userId: 3,
        },
        {
          imageableId: 5,
          imageableType: "Spot",
          url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-633907917135849973/original/34a5ca4f-51cf-4e0b-8338-90b1f3a2b4b0.jpeg?im_w=1440",
          userId: 3,
        },
        {
          imageableId: 5,
          imageableType: "Spot",
          url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-633907917135849973/original/0635a068-30d6-4825-b30b-0804e31d417c.jpeg?im_w=1440",
          userId: 3,
        },
        {
          imageableId: 6,
          imageableType: "Spot",
          url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-633907917135849973/original/0635a068-30d6-4825-b30b-0804e31d417c.jpeg?im_w=1440",
          userId: 2,
        },
        {
          imageableId: 6,
          imageableType: "Spot",
          url: "https://a0.muscache.com/im/pictures/56c4d317-d952-4340-8ed6-2446a4869db9.jpg?im_w=720",
          userId: 2,
        },
        {
          imageableId: 6,
          imageableType: "Spot",
          url: "https://a0.muscache.com/im/pictures/722a0216-7f88-474e-a0de-8b8aa24d2331.jpg?im_w=720",
          userId: 2,
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
