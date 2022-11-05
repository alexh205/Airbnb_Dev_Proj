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
          name: "Cozy little Cabin",
          description:
            "Comes with a kitchen, Wifi, Dryer, Washer, TV with Roku, Air conditioning, Heater",
          price: 85,
          previewImage:
            "https://a0.muscache.com/im/pictures/2e316727-50e2-45ac-9538-37fb7192fb1e.jpg?im_w=1200",
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
          previewImage:
            "https://a0.muscache.com/im/pictures/7d53c25c-43b7-42ec-be3d-50a962d70ffb.jpg?im_w=1200",
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
          previewImage:
            "https://a0.muscache.com/im/pictures/miso/Hosting-49924321/original/bca57cdc-bc62-4366-91e9-03ba6c4059ee.jpeg?im_w=1200",
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
          previewImage:
            "https://a0.muscache.com/im/pictures/3d5e4135-3a07-40b0-ad93-b6e7d19b1ef7.jpg?im_w=1200",
        },
        {
          ownerId: 3,
          address: "12 Broad Street",
          city: "Mineral",
          state: "VA",
          country: "USA",
          lat: 43.26,
          lng: -134.34,
          name: "Luxury Lakefront",
          description:
            "Lake view, Waterfront,Kitchen, Wifi,Dedicated workspace,Free parking on premises,HDTV with Netflix,Free washer – In building,Free dryer – In building,Security cameras on property",
          price: 400,
          previewImage:
            "https://a0.muscache.com/im/pictures/prohost-api/Hosting-633907917135849973/original/a340cb79-ea06-4325-959b-e4bc9f15bf46.jpeg?im_w=1200",
        },
        {
          ownerId: 2,
          address: "3434 Sun Blvd",
          city: "Hilton Head Island",
          state: "SC",
          country: "USA",
          lat: 43.26,
          lng: -134.34,
          name: "Casa Beleza",
          description: "kitchen, Wifi, Dryer, Air conditioning, Heater",
          price: 820,
          previewImage:
            "https://a0.muscache.com/im/pictures/3437e550-3c9a-4400-b04c-6a5a3b534040.jpg?im_w=720",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.bulkDelete("Spots", {});
  },
};
