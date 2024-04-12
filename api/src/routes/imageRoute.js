const { Router } = require('express');
const { Image, Color } = require('../db');
const cloudinary = require('../utils/cloudinary');
// const upload = require('../utils/multer');
const fs = require('fs');
const { uploadFiles, deleteImage } = require('../middlewares/uploadFiles');

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

router.post('/images', async (req, res) => {
  try {
    await uploadFiles(req, res);

    const imageUrls = req.files.map((file) => file.location);

    const createdImages = await Promise.all(imageUrls.map(async (imageUrl) => {
      const image = Image.create({
        url:imageUrl,
      })
      return image;
    }))

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

// router.delete('/images/:id', async (req, res) => {
//   const { id } = req.params;
//   try {
//     const image = await Image.findByPk(id);
//     if(!image) {
//       return res.status(404).json({ message: 'Imagen no encontrada' });
//     }

//     // Eliminar la imagen de cloudinary
//     const publicId = image.url.split('/').slice(-1)[0].split('.')[0];
//     await cloudinary.uploader.destroy(publicId);

//     await image.destroy();
//     res.status(200).json({ message: 'Imagen eliminada correctamente' });
//   } catch(error) {
//     res.status(500).json({ message: 'Error al eliminar la imagen' });
//   } 
// });
router.delete('/images/:id', async (req, res) => {
  const { id } = req.params;

  try {
      // Encuentra la imagen en la base de datos
      const image = await Image.findByPk(id);
      if (!image) {
          return res.status(404).json({ message: 'Imagen no encontrada' });
      }

      // Elimina la imagen de Amazon S3 utilizando la función deleteImage
      await deleteImage(image.url);

      // Elimina la imagen de la base de datos
      await image.destroy();

      // Responde con un mensaje de éxito
      res.status(200).json({ message: 'Imagen eliminada correctamente' });
  } catch (error) {
      console.error('Error al eliminar la imagen:', error);
      res.status(500).json({ message: 'Error al eliminar la imagen' });
  }
});


module.exports = router;