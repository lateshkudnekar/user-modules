'use strict';
module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define('users', {
    name: DataTypes.STRING,
    password: DataTypes.STRING,
    salt: DataTypes.STRING,
    email: DataTypes.STRING,
    userType: DataTypes.STRING
  }, {});
  users.associate = function(models) {
    // associations can be defined here
      users.hasMany(models.user_modules, { foreignKey: 'userId' });
  };
  return users;
};