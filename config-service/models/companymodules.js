'use strict';
module.exports = (sequelize, DataTypes) => {
  const CompanyModules = sequelize.define('CompanyModules', {
    moduleId: DataTypes.INTEGER,
    companyId: DataTypes.BIGINT,
    plan: DataTypes.INTEGER,
    updatedBy: DataTypes.STRING
  }, {});
  CompanyModules.associate = function(models) {
    // associations can be defined here
  };
  return CompanyModules;
};