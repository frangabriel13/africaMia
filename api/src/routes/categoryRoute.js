const { Router } = require('express');
const { Category } = require('../db');

const router = Router();

router.get('/categories', async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.status(200).json(categories);
  } catch(error) {
    res.status(500).json({ message: 'Error al obtener las categorías' });
  }
})

router.get('/categories/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const category = await Category.findByPk(id);
    if(!category) {
      return res.status(404).json({ message: 'Categoría no encontrada' });
    }
    res.status(200).json(category)
  } catch(error) {
    res.status(500).json({ message: 'Error al obtener categoría' });
  }
})

router.post('/categories', async (req, res) => {
  const { name, parentId } = req.body;

  try {
    const createdCategory = await Category.create({
      name,
      parentId
    })
    res.status(200).json(createdCategory);
  } catch(error) {
    console.log(error);
    res.status(500).json({ message: 'Error al crear la categoría' })
  }
})

router.put('/categories/:id', async (req, res) => {
  const { id } = req.params;
  const { name, parentId } = req.body;

  try {
    const category = await Category.findByPk(id);
    if(!category) {
      return res.status(404).json({ message: 'Categoría no encontrada' });
    }

    category.name = name || category.name;
    category.parentId = parentId !== undefined ? parentId : category.parentId;
    await category.save();

    res.status(200).json(category);
  } catch(error) {
    res.status(500).json({ message: 'Error al actualizar cateogría' });
  }
})

router.delete('/categories/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const category = await Category.findByPk(id);
    if(!category) {
      return res.status(404).json({ message: 'Categoría no encontrada' });
    }

    await category.destroy();
    res.status(200).json({ message: 'Categoría eliminada correctamente' });
  } catch(error) {
    res.status(500).json({ message: 'Error al eliminar la categoría' });
  }
})


module.exports = router;