'use strict';
module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define('users', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    userType: DataTypes.STRING
  }, {});
  users.associate = function(models) {
    // associations can be defined here
    users.belongsToMany(models.modules,{as: 'modules',through: 'user_modules', foreignKey: 'userId' });

  };
  return users;
};