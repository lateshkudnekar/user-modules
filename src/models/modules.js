'use strict';
module.exports = (sequelize, DataTypes) => {
  const modules = sequelize.define('modules', {
    name: DataTypes.STRING
  }, {});
  modules.associate = function(models) {
    // associations can be defined here
    // modules.hasMany(models.user_modules,{through: 'worker_tasks', foreignKey: 'moduleId' });
    modules.belongsToMany(models.users,{as: 'users',through: 'user_modules', foreignKey: 'moduleId' });
  };
  return modules;
};