'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserGameBiodata extends Model {
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
  UserGameBiodata.init({
    name: {
      type: DataTypes.STRING
    },
    age: {
      type: DataTypes.INTEGER
    },
    address: {
      type: DataTypes.STRING
    },
    about: {
      type: DataTypes.TEXT
    }
  }, {
    sequelize,
    modelName: 'UserGameBiodata',
  });
  return UserGameBiodata;
};