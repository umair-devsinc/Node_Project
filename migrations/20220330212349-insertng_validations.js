"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn("Posts", "title", {
      type: Sequelize.STRING,
      allowNull: false,
    });
    await queryInterface.changeColumn("Posts", "content", {
      type: Sequelize.STRING,
      allowNull: false,
    });
    await queryInterface.changeColumn("Users", "firstName", {
      type: Sequelize.STRING,
      allowNull: false,
    });
    await queryInterface.changeColumn("Users", "lastName", {
      type: Sequelize.STRING,
      allowNull: false,
    });
    await queryInterface.changeColumn("Users", "email", {
      type: Sequelize.STRING,
      validate: {
        isEmail: true,
      },
    });
    await queryInterface.changeColumn("Users", "password", {
      type: Sequelize.STRING,
      validate: {
        isAlphanumeric: true,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
