const { Router } = require('express');
const { Variation, Color, Size, Product } = require('../db');

const router = Router();

router.get('/variations', async (req, res) => {
  try {
    const variations = await Variation.findAll({
      include: [
        {
          model: Color,
          as: 'color',
          attributes: ['id', 'name'],
        },
        {
          model: Size,
          as: 'size',
          attributes: ['id', 'name'],
        },
        {
          model: Product,
          as: 'product',
          attributes: ['id', 'name'],
        }
      ]
    });
    res.status(200).json(variations);
  } catch(error) {
    res.status(500).json({ message: 'Error al obtener las variaciones' });
  }
});

router.get('/variations/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const variation = await Variation.findByPk(id, {
      include: [
        {
          model: Color,
          as: 'color',
          attributes: ['id', 'name'],
        },
        {
          model: Size,
          as: 'size',
          attributes: ['id', 'name'],
        },
        {
          model: Product,
          as: 'product',
          attributes: ['id', 'name'],
        }
      ]
    });
    if(!variation) {
      return res.status(404).json({ message: 'Variación no encontrada' });
    }
    res.status(200).json(variation)
  } catch(error) {
    res.status(500).json({ message: 'Error al obtener la variación' });
  }
});

// router.post('/variations', async (req, res) => {
//   const { colorId, sizeId, productId, stock, price } = req.body;

//   try {
//     const variation = await Variation.create({
//       colorId,
//       sizeId,
//       productId,
//       stock,
//       price,
//     });
//     res.status(201).json(variation);
//   } catch(error) {
//     res.status(500).json({ message: 'Error al crear la variación' });
//   }
// });


module.exports = router;