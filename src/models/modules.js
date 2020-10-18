'use strict';
module.exports = (sequelize, DataTypes) => {
  const modules = sequelize.define('modules', {
    name: DataTypes.STRING
  }, {});
  modules.associate = function(models) {
    // associations can be defined here
    users.hasMany(models.user_modules,{ foreignKey: 'userId' });
  };
  return modules;
};