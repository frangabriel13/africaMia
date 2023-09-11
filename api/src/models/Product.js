const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define('product', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    availability: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    isVariable: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
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