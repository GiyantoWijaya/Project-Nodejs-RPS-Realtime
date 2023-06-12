'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ UserGameBiodata, UserGameHistory, Play }) {
      // define association here
      this.hasOne(Play, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        foreignKey: 'userId1'
      });
      this.hasOne(Play, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        foreignKey: 'userId2'
      });
      this.hasMany(UserGameBiodata, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        foreignKey: 'userId'
      });
      this.hasMany(UserGameHistory, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        foreignKey: 'userId'
      });
    }
  }
  User.init({
    email: {
      type: DataTypes.STRING
    },
    password: {
      type: DataTypes.STRING
    },
    token: {
      type: DataTypes.STRING
    },
    isAdmin: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};