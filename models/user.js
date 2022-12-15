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

  User.associate = (models) => { /** define association here */ }

  return User;
};

// export default (sequelize, DataTypes) => {

//   class User extends Model {};

//   User.init({
//     name: {
//       type: DataTypes.STRING,
//     },
//     phone_number: {
//       type: DataTypes.STRING,
//     },
//     otp: {
//       type: DataTypes.STRING,
//     },
//     otp_expiration_date: {
//       type: DataTypes.STRING,
//     }
//   }, {
//     sequelize,
//     modelName: 'User',
//   });

//   User.associate = (models) => { /** define association here */ }

//   return User;
// };