'use strict';
module.exports = (sequelize, DataTypes) => {
  const State = sequelize.define('State', {
    countryId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    sigla: DataTypes.STRING
  }, {
    timestamps: true,
    sequelize
  });
  return State;
};