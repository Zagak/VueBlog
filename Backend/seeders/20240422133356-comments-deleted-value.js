"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkUpdate(
      "Comments",
      {
        deleted: false, // Set the desired default value for the 'deleted' field
      }
      // {
      //   deleted: null, // Condition to select rows that need updating (e.g., where 'deleted' is null)
      // }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkUpdate(
      "Comments",
      {
        deleted: null, // Optionally revert the 'deleted' field to null during rollback
      },
      {
        deleted: true, // Condition to select rows to revert
      }
    );
  },
};
