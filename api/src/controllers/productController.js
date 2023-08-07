const { Product, Category, Variation } = require('../db');
const { Op } = require("sequelize");

const getProduct = async (req, res) => {
  const { name } = req.query;
  let products;

  if(name) {
    products = await Product.findAll({
      where: {
        [op.or]: [
          { name: { [Op.iLike]: `%${name}%` } },
          { name: { [Op.iLike]: `%${name.split(" ").join("%")}%` } }
        ]
      },
      include: [
        {
          model: Variation,
          as: 'variations'
        },
        {
          model: Category,
          as: 'category'
        }
      ]
    })
  } else {
    products = await Product.findAll({
      include: [
        {
          model: Variation,
          as: 'variations'
        },
        {
          model: Category,
          as: 'category'
        }
      ]
    });

    return products;
  }
}


module.exports = {
  getProduct,
};