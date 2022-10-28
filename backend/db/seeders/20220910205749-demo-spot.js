"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.bulkInsert(
      "Spots",
      [
        {
          ownerId: 1,
          address: "123 Some Lane",
          city: "Rugby",
          state: "ND",
          country: "USA",
          lat: 48.37,
          lng: -100.001,
          name: "Cozy little Cottage",
          description:
            "Comes with a kitchen, Wifi, Dryer, Washer, TV with Roku, Air conditioning, Heater",
          price: 85,
        },
        {
          ownerId: 2,
          address: "321 Over Drive",
          city: "Nirvana",
          state: "CA",
          country: "USA",
          lat: 38.87,
          lng: -89.12,
          name: "Fancy Hut",
          description:
            "Not your typical hut, as it comes with Wifi, TV with Apple TV, Hand Fan, Pool, Glass Roof, with a river near by for all your water needs",
          price: 158,
        },
        {
          ownerId: 3,
          address: "23 Sleepover Drive",
          city: "FunTown",
          state: "MA",
          country: "USA",
          lat: 42.88,
          lng: -97.41,
          name: "Tree House",
          description:
            "The house is equipped with a kitchen, Wifi, Dryer, Washer, TV with Prime Video, Fan, Slide",
          price: 75,
        },
        {
          ownerId: 1,
          address: "987 Closer Blvd",
          city: "Hollywood",
          state: "FL",
          country: "USA",
          lat: 43.26,
          lng: -134.34,
          name: "Modern Apartment",
          description: "kitchen, Wifi, Dryer, Air conditioning, Heater",
          price: 123,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.bulkDelete("Spots", {});
  },
};
