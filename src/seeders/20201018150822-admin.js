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
    return queryInterface.bulkInsert('users', [{
      username: "admin",
      password: "$argon2i$v=19$m=4096,t=3,p=1$5w/ymcTYlJZpQ27JKMPwWQ$6vHJEWj2mjRZe4kx/7l2vnvQKCysU0NeRiGRBw5snu8",
      userType:"admin",
      createdAt:new Date(),
      updatedAt: new Date()
    }], {});
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
