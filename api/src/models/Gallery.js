const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define('gallery', {
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  })
}