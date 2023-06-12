'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('MultiPlayerGameHistories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      playId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Plays',
          key: 'id'
        },
        allowNull: false
      },
      noHistory: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: null
      },
      result: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null
      },
      player1: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null
      },
      player2: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null
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
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('MultiPlayerGameHistories');
  }
};