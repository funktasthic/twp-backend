'use strict';

const bcryptjs = require('bcryptjs');
const { verify } = require('jsonwebtoken');
const salt = bcryptjs.genSaltSync();

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return await queryInterface.bulkInsert("Users", [
      {
        name: "Ignacio",
        lastname: "Avendano",
        email: "admin@twp.com",
        phone: "123456789",
        image_url: "https://avatars.githubusercontent.com/u/43661563?v=4",
        password: bcryptjs.hashSync("AdminTWP_2025", salt),
        role_id: 1,
        verified: true,
        verify_code: 1234,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    return await queryInterface.bulkDelete("Users", null, {});
  }
};
