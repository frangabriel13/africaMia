const { Product, Category, Variation } = require('../db');
const { Op } = require("sequelize");

const createProduct = async (req, res) => {
  await uploadFiles(req, res);

  const { name, description, availability, isVariable, price, stock, categoryId, variations } = req.body;
  const isVariableBool = isVariable === 'true';
  const isActiveBool = availability === 'true';
  const variationsArray = JSON.parse(variations);

  let imgMain;
  if (req.files && req.files.length > 0) {
    imgMain = req.files[0].location;
  }

  const product = await Product.create({
    name,
    description,
    price,
    stock,
    isVariable: isVariableBool,
    availability: isActiveBool,
    categoryId,
    imgMain,
  });

  if (isVariable) {
    await Promise.all(variations.map(async (variation) => {
      const { sizeId, colorId, availability, stock, price } = variation;
      await Variation.create({
        sizeId,
        colorId,
        availability,
        stock,
        price,
        productId: product.id,
      });
    }));
  }
}


module.exports = {
  getProduct,
};