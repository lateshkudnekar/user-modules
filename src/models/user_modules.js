'use strict';
module.exports = (sequelize, DataTypes) => {
  const user_modules = sequelize.define('user_modules', {
    userId: DataTypes.INTEGER
  }, {});
  user_modules.associate = function(models) {
    // associations can be defined here
    user_modules.belongsTo(models.users, { foreignKey: 'userId' });
    user_modules.belongsTo(models.modules, { foreignKey: 'moduleId' });
  };
  return user_modules;
};