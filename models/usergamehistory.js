'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserGameHistory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User }) {
      // define association here
      this.belongsTo(User, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        foreignKey: 'userId',
      });
    }
  }
  UserGameHistory.init({
    result: {
      type: DataTypes.STRING
    },
    computer: {
      type: DataTypes.STRING
    },
    player: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'UserGameHistory',
  });
  return UserGameHistory;
};