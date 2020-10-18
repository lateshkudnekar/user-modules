'use strict';
module.exports = (sequelize, DataTypes) => {
  const user_modules = sequelize.define('user_modules', {
    userId: DataTypes.INTEGER,
    moduleId:DataTypes.INTEGER
  }, {});
  user_modules.associate = function(models) {
    // associations can be defined here
  };
  return user_modules;
};