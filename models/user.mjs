'use strict';
// const {
//   Model
// } = require('sequelize');
import { Model } from 'sequelize';
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    name: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    otp: DataTypes.STRING,
    otp_expiration_date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};