'use strict';
const faker = require('faker')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Orders',
      Array.from({ length: 2 }).map((item, index) => ({
        amount: faker.random.number(),
        sn: faker.random.number(),
        shipping_status: Math.floor(Math.random() * 1),
        payment_status: Math.floor(Math.random() * 1),
        user_id: index + 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      ), {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Orders', null, {})
  }
};
