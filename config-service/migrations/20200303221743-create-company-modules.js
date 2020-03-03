'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('CompanyModules', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      moduleId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      companyId: {
        type: Sequelize.BIGINT,
        allowNull: false
      },
      plan: {
        type: Sequelize.INTEGER
      },
      updatedBy: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('CompanyModules');
  }
};