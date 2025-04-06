'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable("Roles", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        unique: true
      },
      name: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    })
  },

  async down (queryInterface, Sequelize) {
    return await queryInterface.dropTable("Roles");
  }
};
