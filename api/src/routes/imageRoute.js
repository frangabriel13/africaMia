const { Router } = require('express');
const { Image, Color } = require('../db');
const cloudinary = require('../utils/cloudinary');
const upload = require('../utils/multer');
const fs = require('fs');

const router = Router();

router.get('/images', async (req, res) => {
  try {
    const images = await Image.findAll({
      include: [
        {
          model: Color,
          as: 'color', 
          attributes: ['id', 'name'],
        }
      ]
    });
    res.status(200).json(images);
  } catch(error) {
    res.status(500).json({ message: 'Error al obtener las imagenes' });
  }
});

router.get('/images/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const image = await Image.findByPk(id, {
      include: [
        {
          model: Color,
          as: 'color', 
          attributes: ['id', 'name'],
        }
      ]
    });
    if(!image) {
      return res.status(404).json({ message: 'Imagen no encontrada' });
    }
    res.status(200).json(image)
  } catch(error) {
    res.status(500).json({ message: 'Error al obtener la imagen' });
  }
});

router.post('/images', upload.array('images'), async (req, res) => {
  const imagePaths = req.files.map((file) => file.path);
  // const { colorId } = req.body;

  try {
    const uploadedImages = await Promise.all(imagePaths.map((path) => cloudinary.uploader.upload(path)));
    const imageUrls = uploadedImages.map((image) => image.secure_url);

    const createdImages = await Promise.all(imageUrls.map(async (imageUrl) => {
      const image = await Image.create({
        url: imageUrl,
        // colorId,
      });
      return image;
    }));

    // Eliminar los archivos temporales
    imagePaths.forEach((path) => {
      fs.unlinkSync(path);
    });

    res.status(200).json(createdImages);
  } catch(error) {
    console.log(error);
    res.status(500).json({ message: 'Error al crear la imagen' });
  }  
});

router.put('/images/:id', async (req, res) => {
  const { id } = req.params;
  const { colorId } = req.body;
  try {
    const image = await Image.findByPk(id);
    if(!image) {
      return res.status(404).json({ message: 'Imagen no encontrada' });
    }
    await image.update({
      colorId,
    });
    res.status(200).json(image);
  } catch(error) {
    res.status(500).json({ message: 'Error al actualizar la imagen' });
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
});


module.exports = router;