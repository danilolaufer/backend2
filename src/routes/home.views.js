const { Router } = require('express');
const { ProductManager } = require('../src/controllers/productManager.js');

const productManager = new ProductManager('src/db/products.json');
const homeRouter = Router();

homeRouter.get('/', async (req, res) => {
  const data = await productManager.getProducts();
  res.render('home', { data, style: 'index.css' });
});

module.exports = {
  homeRouter,
};
