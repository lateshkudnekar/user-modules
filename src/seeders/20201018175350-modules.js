'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('modules', [
      {
        name: 'Module 1',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Module 2',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Module 3',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Module 4',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Module 5',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Module 6',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Module 7',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Module 8',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Module 9',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Module 10',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
