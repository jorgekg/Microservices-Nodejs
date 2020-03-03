const sha1 = require('sha1');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      set(val) {
        this.setDataValue('password', sha1(val));
      }
    },
    personId: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    updatedBy: DataTypes.STRING
  }, {
    timestamps: true,
    sequelize
  });
  return User;
};