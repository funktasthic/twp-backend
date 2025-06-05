'use strict';

const bcryptjs = require('bcryptjs');
const salt = bcryptjs.genSaltSync();

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return await queryInterface.bulkInsert("Users", [
      {
        name: "María",
        lastname: "Fernández",
        email: "maria123@gmail.com",
        phone: "987654321",
        image_url: "https://i.pravatar.cc/150?img=47",
        password: bcryptjs.hashSync("maria123", salt),
        verified: true,
        verify_code: 2345,          
        role_id: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    return await queryInterface.bulkDelete("Users", null, {});
  }
};
