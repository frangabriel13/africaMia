const { Product, Category, Variation } = require('../db');
const { Op } = require("sequelize");

const getProduct = async (req, res) => {
  const { name } = req.query;
  let products;

  if(name) {
    products = await Product.findAll({
      where: {
        [op.or]: [
          { name: { [Op.iLike]: `%${name}%` } },
          { name: { [Op.iLike]: `%${name.split(" ").join("%")}%` } }
        ]
      },
      include: [
        {
          model: Variation,
          as: 'variations'
        },
        {
          model: Category,
          as: 'category'
        }
      ]
    })
  } else {
    products = await Product.findAll({
      include: [
        {
          model: Variation,
          as: 'variations'
        },
        {
          model: Category,
          as: 'category'
        }
      ]
    });

    return products;
  }
}

// const getProduct = async (req, res) => {
//   try {
//     const { name } = req.query;

//     // Si se envía el parámetro 'name', filtramos los productos por ese nombre
//     const productOptions = {
//       include: [
//         {
//           model: Variation,
//           as: 'variations',
//         },
//         {
//           model: Category,
//           as: 'category',
//         },
//       ],
//     };

//     if (name) {
//       productOptions.where = {
//         name: {
//           [Op.iLike]: `%${name}%`, // Buscar productos que contengan el nombre (ignorando mayúsculas y minúsculas)
//         },
//       };
//     }

//     const products = await Product.findAll(productOptions);
//     res.status(200).json(products);
//   } catch (error) {
//     res.status(500).json({ message: 'Error al obtener los productos' });
//   }
// };




module.exports = {
  getProduct,
};