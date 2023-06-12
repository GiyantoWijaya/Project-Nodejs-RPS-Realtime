'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Plays', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      roomName: {
        type: Sequelize.STRING
      },
      roomNumber: {
        type: Sequelize.INTEGER
      },
      userId1: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id'
        },
        allowNull: true,
        defaultValue: null
      },
      userId2: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id'
        },
        allowNull: true,
        defaultValue: null
      },
      player1: {
        type: Sequelize.BOOLEAN
      },
      player2: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
    // await queryInterface.addConstraint('Plays', {
    //   type: 'unique',
    //   fields: ['userId1', 'userId2']
    // });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Plays');
  }
};