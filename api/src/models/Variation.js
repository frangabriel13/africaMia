const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define('variation', {
    size: {
      type: DataTypes.STRING,
      allowNull: false
    },
    color: {
      type: DataTypes.STRING,
      allowNull: false
    },
    availability: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    }
  })
}