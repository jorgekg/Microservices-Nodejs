'use strict';
module.exports = (sequelize, DataTypes) => {
  const Company = sequelize.define('Company', {
    socialName: DataTypes.STRING,
    name: DataTypes.STRING,
    document: DataTypes.STRING,
    countryId: DataTypes.INTEGER,
    stateId: DataTypes.INTEGER,
    city: DataTypes.STRING,
    neighborhood: DataTypes.STRING,
    street: DataTypes.STRING,
    number: DataTypes.STRING,
    phone: DataTypes.STRING,
    active: DataTypes.BOOLEAN,
    updateBy: DataTypes.STRING
  }, {
    timestamps: true,
    sequelize
  });
  return Company;
};