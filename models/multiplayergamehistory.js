'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MultiPlayerGameHistory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Play }) {
      // define association here
      this.belongsTo(Play, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        foreignKey: 'playId'
      });
    }
  }
  MultiPlayerGameHistory.init({
    playId: DataTypes.INTEGER,
    noHistory: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    result: {
      type: DataTypes.STRING,
      allowNull: true
    },
    player1: {
      type: DataTypes.STRING,
      allowNull: true
    },
    player2: {
      type: DataTypes.STRING,
      allowNull: true
    },
  }, {
    sequelize,
    modelName: 'MultiPlayerGameHistory',
  });
  return MultiPlayerGameHistory;
};