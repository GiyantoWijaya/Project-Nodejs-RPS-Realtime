'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Play extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, MultiPlayerGameHistory }) {
      // define association here
      this.belongsTo(User, {
        foreignKey: 'userId1'
      });
      this.belongsTo(User, {
        foreignKey: 'userId2'
      });
      this.hasMany(MultiPlayerGameHistory, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        foreignKey: 'playId'
      });
    }
  }
  Play.init({
    roomName: DataTypes.STRING,
    roomNumber: DataTypes.INTEGER,
    userId1: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    userId2: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    player1: DataTypes.BOOLEAN,
    player2: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Play',
  });
  return Play;
};