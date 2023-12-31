const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define('color', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    code: {
      type: DataTypes.STRING,
    }
  })
}