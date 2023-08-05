const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define('attribute', {
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      defaultValue: null,
    }
  })
}