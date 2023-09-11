const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define('variation', {
    availability: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    price: {
      type: DataTypes.FLOAT,
    },
    stock: {
      type: DataTypes.INTEGER,
    },
    imgMain: {
      type: DataTypes.STRING,
    } 
  })
}