const { Router } = require('express');
const productController = require('../controllers/products.controller');

const router = Router();

router.get('/', productController.findAll);
router.get('/:id', productController.findOne);

module.exports = router;
