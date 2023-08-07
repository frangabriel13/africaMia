require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/africa_mia`,
  {
    logging: false,
    native: false,
  }
);
const basename = path.basename(__filename);

const modelDefiners = [];

fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

modelDefiners.forEach((model) => model(sequelize));
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

const { Product, Variation, Category, Image, Attribute } = sequelize.models;

Product.hasMany(Variation, { as: 'variations' });
Variation.belongsTo(Product, { as: 'product', foreignKey: 'productId' } );

Product.belongsTo(Category, { as: 'category', foreignKey: 'categoryId' });
Category.hasMany(Product, { as: 'products' });

Category.belongsTo(Category, { as: 'parent', foreignKey: 'parentId' });
Category.hasMany(Category, { as: 'subcategories' });

Product.belongsToMany(Image, { through: 'product_image', as: 'images', foreignKey: 'productId' });
Image.belongsToMany(Product, { through: 'product_image', as: 'products', foreignKey: 'imageId' });

Product.hasOne(Attribute, { as: 'attributes' });
Attribute.belongsTo(Product, { as: 'product', foreignKey: 'productId' });

Variation.hasOne(Attribute, { as: 'attributes' });
Attribute.belongsTo(Product, { as: 'variation', foreignKey: 'variationId' });


module.exports = {
  ...sequelize.models,
  conn: sequelize,
};