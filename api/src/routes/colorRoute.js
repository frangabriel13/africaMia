const { Router } = require('express');
const { Color } = require('../db');

const router = Router();

router.get('/colors', async (req, res) => {
  try {
    const colors = await Color.findAll();
    res.status(200).json(colors);
  } catch(error) {
    res.status(500).json({ message: 'Error al obtener los colores' });
  }
});

router.get('/colors/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const color = await Color.findByPk(id);
    if(!color) {
      return res.status(404).json({ message: 'Color no encontrado' });
    }
    res.status(200).json(color);
  } catch(error) {
    res.status(500).json({ message: 'Error al obtener el color' });
  }
});

router.post('/colors', async (req, res) => {
  const { name, code } = req.body;
  try {
    const color = await Color.create({
      name,
      code,
    });
    res.status(201).json(color);
  } catch(error) {
    res.status(500).json({ message: 'Error al crear el color' });
  }
});

router.put('/colors/:id', async (req, res) => {
  const { id } = req.params;
  const { name, code } = req.body;
  try {
    const color = await Color.findByPk(id);
    if(!color) {
      return res.status(404).json({ message: 'Color no encontrado' });
    }
    await color.update({
      name,
      code,
    });
    res.status(200).json(color);
  } catch(error) {
    res.status(500).json({ message: 'Error al actualizar el color' });
  }
});

router.delete('/colors/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const color = await Color.findByPk(id);
    if(!color) {
      return res.status(404).json({ message: 'Color no encontrado' });
    }
    await color.destroy();
    res.status(200).json({ message: 'Color eliminado' });
  } catch(error) {
    res.status(500).json({ message: 'Error al eliminar el color' });
  }
});


module.exports = router;