
module.exports = (sequelize, DataTypes) => {
  const Token = sequelize.define('Token', {
    keyId: {
      type: DataTypes.STRING,
      allowNull: true
    },
    userId: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    companyId: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedBy: {
      allowNull: true,
      type: DataTypes.STRING
    }
  }, {
    timestamps: true,
    sequelize
  });
  return Token;
};