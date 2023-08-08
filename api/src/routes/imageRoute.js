const { Router } = require('express');
const { Image } = require('../db');
const cloudinary = require('../utils/cloudinary');


const router = Router();

router.get('/images', async (req, res) => {
  try {
    const images = await Image.findAll();
    res.status(200).json(images);
  } catch(error) {
    res.status(500).json({ message: 'Error al obrener las imagenes' });
  }
})

router.get('/images/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const image = await Image.findByPk(id);
    if(!image) {
      return res.status(404).json({ message: 'Imagen no encontrada' });
    }
    res.status(200).json(image)
  } catch(error) {
    res.status(500).json({ message: 'Error al obtener la imagen' });
  }
})

router.post('/images', async (req, res) => {
  const { url } = req.body;

  try {
    const image = await Image.create({ url });
    res.status(200).json(image);
  } catch(error) {
    res.status(500).json({ message: 'Error al crear la imagen' });
  }  
});

router.delete('/images/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const image = await Image.findByPk(id);
    if(!image) {
      return res.status(404).json({ message: 'Imagen no encontrada' });
    }

    await image.destroy();
    res.status(200).json({ message: 'Imagen eliminada correctamente' });
  } catch(error) {
    res.status(500).json({ message: 'Error al eliminar la imagen' });
  }
})


module.exports = router;
