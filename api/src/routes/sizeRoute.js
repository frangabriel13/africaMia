const { Router } = require("express");
const { Size } = require('../db');

const router = Router();

router.get('/sizes', async (req, res) => {
  try {
    const sizes = await Size.findAll();
    res.status(200).json(sizes);
  } catch(error) {
    res.status(500).json({ message: 'Error al obtener los sizes' });
  }
});

router.get('/sizes/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const size = await Size.findByPk(id);
    if(!size) {
      return res.status(404).json({ message: 'Size no encontrado' });
    }
    res.status(200).json(size);
  } catch(error) {
    res.status(500).json({ message: 'Error al obtener el size' });
  }
});

router.post('/sizes', async (req, res) => {
  const { name } = req.body;
  try {
    const size = await Size.create({
      name,
    });
    res.status(201).json(size);
  } catch(error) {
    res.status(500).json({ message: 'Error al crear el size' });
  }
});

router.put('/sizes/:id', async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const size = await Size.findByPk(id);
    if(!size) {
      return res.status(404).json({ message: 'Size no encontrado' });
    }
    await size.update({
      name,
    });
    res.status(200).json(size);
  } catch(error) {
    res.status(500).json({ message: 'Error al actualizar el size' });
  }
});

router.delete('/sizes/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const size = await Size.findByPk(id);
    if(!size) {
      return res.status(404).json({ message: 'Size no encontrado' });
    }
    await size.destroy();
    res.status(200).json({ message: 'Size eliminado correctamente' });
  } catch(error) {
    res.status(500).json({ message: 'Error al eliminar el size' });
  }
});


module.exports = router;