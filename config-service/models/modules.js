'use strict';
module.exports = (sequelize, DataTypes) => {
  const Modules = sequelize.define('Modules', {
    moduleId: DataTypes.INTEGER,
    name: DataTypes.STRING
  }, {
    timestamps: true,
    sequelize
  });
  return Modules;
};