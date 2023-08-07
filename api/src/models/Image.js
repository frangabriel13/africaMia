const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define('image', {
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    color: {
      type: DataTypes.STRING
    }
  })
}