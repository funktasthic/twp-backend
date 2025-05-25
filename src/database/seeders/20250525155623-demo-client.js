'use strict';

const bcryptjs = require('bcryptjs');
const salt = bcryptjs.genSaltSync();

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return await queryInterface.bulkInsert("Users", [
      {
        name: "Juan",
        lastname: "Gonzalez",
        email: "juan123@gmail.com",
        phone: "967654321",
        image_url: "https://i.pravatar.cc/150?img=47",
        password: bcryptjs.hashSync("juan123", salt),
        role_id: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    return await queryInterface.bulkDelete("Users", null, {});
  }
};
