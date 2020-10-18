'use strict';
module.exports = (sequelize, DataTypes) => {
  const modules = sequelize.define('modules', {
    name: DataTypes.STRING
  }, {});
  modules.associate = function(models) {
    // associations can be defined here
    modules.hasMany(models.user_modules,{ foreignKey: 'moduleId' });
  };
  return modules;
};