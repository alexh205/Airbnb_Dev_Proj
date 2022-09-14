"use strict";

const bcrypt = require("bcryptjs");
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert(
      "Users",
      [
        {
          firstName: "Jimmy",
          lastName: "Thompson",
          email: "deÏmo@user.io",
          username: "Demo-lition",
          hashedPassword: bcrypt.hashSync("password"),
          isHost: false,
        },
        {
          firstName: "Nick",
          lastName: "Johnson",
          email: "user1@user.io",
          username: "FakeUser1",
          hashedPassword: bcrypt.hashSync("password2"),
          isHost: true,
        },
        {
          firstName: "Angela",
          lastName: "Davis",
          email: "user2@user.io",
          username: "FakeUser2",
          hashedPassword: bcrypt.hashSync("password3"),
          isHost: false,
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return await queryInterface.bulkDelete(
      "Users",
      {
        username: { [Op.in]: ["Demo-lition", "FakeUser1", "FakeUser2"] },
      },
      {}
    );
  },
};
