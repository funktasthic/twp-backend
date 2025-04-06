'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return await queryInterface.bulkInsert("Roles", [
      {
        name: "admin",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "paseador",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "cliente",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    return await queryInterface.bulkDelete("Roles", null, {});
  }
};
