const { Router } = require("express");
const { Product, Variation, Category, Image, Size, Color } = require('../db');
const cloudinary = require('../utils/cloudinary');
const { uploadFiles } = require('../middlewares/uploadFiles');

const router = Router();

router.get('/products', async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [
        {
          model: Variation,
          as: 'variations',
          attributes: ['id', 'sizeId', 'colorId', 'stock', 'price'],
        },
        {
          model: Category,
          as: 'category',
          attributes: ['id', 'name'],
        },
        {
          model: Image,
          as: 'images',
          attributes: ['id', 'url'],
        }
      ]
    });

    for(const product of products) {
      const images = await product.getImages({
        attributes: ['id', 'url'],
      });
      product.setDataValue('images', images);
    }

    res.status(200).json(products);
  } catch(error) {
    console.log(error);
    res.status(500).json({ message: 'Error al obtener los productos' });
  }
});

router.get('/products/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByPk(id, {
      include: [
        {
          model: Variation,
          as: 'variations',
          attributes: ['id', 'sizeId', 'colorId', 'stock', 'price'],
          include: [
            {
              model: Size,
              as: 'size',
              attributes: ['id', 'name']
            },
            {
              model: Color,
              as: 'color',
              attributes: ['id', 'name']
            }
          ]
        },
        {
          model: Category,
          as: 'category',
          attributes: ['id', 'name'],
        },
      ]
    });
    if(!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    const images = await product.getImages({
      attributes: ['id', 'url'],
    });
    product.setDataValue('images', images);

    res.status(200).json(product);
  } catch(error) {
    console.log(error);
    res.status(500).json({ message: 'Error al obtener el producto' });
  }
});

router.post('/products', async (req, res) => {
  const { name, description, availability, isVariable, price, stock, categoryId, variations, images, imgMain } = req.body;

  try {
    const product = await Product.create({
      name,
      description,
      availability,
      isVariable,
      price,
      stock,
      categoryId,
      imgMain,
    });

    if(isVariable) {
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

    if(images) {
      await Promise.all(images.map(async (image) => {
        await product.addImage(image.id);
      }));
    }

    res.status(201).json(product);
  } catch(error) {
    console.log(error);
    res.status(500).json({ message: 'Error al crear el producto' });
  }
});

router.put('/products/:id', async (req, res) => {
  const { id } = req.params;
  const { name, description, availability, isVariable, price, stock, categoryId, variations, images } = req.body;

  try {
    const product = await Product.findByPk(id);
    if(!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    await product.update({
      name,
      description,
      availability,
      isVariable,
      price,
      stock,
      categoryId,
    });

    if(isVariable) {
      await Promise.all(variations.map(async (variation) => {
        const { sizeId, colorId, stock, price, availability } = variation;
        await Variation.create({
          sizeId,
          colorId,
          stock,
          price,
          availability,
          productId: product.id,
        });
      }));
    }

    if(images) {
      await Promise.all(images.map(async (image) => {
        await product.addImage(image.id);
      }));
    }

    res.status(200).json(product);
  } catch(error) {
    console.log(error);
    res.status(500).json({ message: 'Error al actualizar el producto' });
  }
});

router.delete('/products/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByPk(id);
    if(!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    await product.destroy();
    res.status(200).json(product);
  } catch(error) {
    console.log(error);
    res.status(500).json({ message: 'Error al eliminar el producto' });
  }
});


module.exports = router;

//hacer deploy