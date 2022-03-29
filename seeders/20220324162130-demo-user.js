'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    
   
     await queryInterface.bulkInsert('Users', [{
       firstName: 'John',
       lastName:'Doe',
       email:'johndoe@gmail.com',
       password:'1234',
       createdAt: new Date(),
       updatedAt: new Date()
     }], {});
    
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
