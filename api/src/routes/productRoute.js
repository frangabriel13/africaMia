const { Router } = require("express");
const { Product, Variation } = require('../db');
const { getProduct } = require("../controllers/productController");
const cloudinary = require('../utils/cloudinary');

const router = Router();

router.get('/products', async (req, res) => {
  try {
    const product = await getProduct(req, res);
    res.status(200).json(product);
  } catch(error) {
    res.status(500).json({ message: 'Error al buscar productos' });
  }
})

router.post('/products', async (req, res) => {
  const { name, description, price, images, stock, availability, isVariable, category, variations  } = req.body;

  try {
    const uploadedImages = await Promise.all(images.map((image) => cloudinary.uploader.upload(image)));
    const imageUrls = uploadedImages.map((image) => image.secure_url);

    const productCreated = await Product.create({
      name,
      description,
      price,
      images: imageUrls,
      stock,
      availability,
      isVariable,
      category
    });

    if (isVariable && variations && variations.length > 0) {
      await Variation.bulkCreate(variations.map((variation) => ({ ...variation, productId: productCreated.id })));
    }

    res.status(201).json(productCreated);
  } catch(error) {
    res.status(500).json({ message: 'Error al crear el producto' });
  }
})


module.exports = router;