const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define('variation', {
    size: {
      type: DataTypes.STRING,
    },
    color: {
      type: DataTypes.STRING,
    },
    availability: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    }
  })
}