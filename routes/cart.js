const express = require('express');
const router = express.Router();
const CartController = require('../controllers/CartController');

// Adicionar produto ao carrinho
router.post('/add', CartController.addToCart);

// Remover produto do carrinho
router.delete('/remove/:id', CartController.removeFromCart);

// Visualizar carrinho
router.get('/', CartController.getCart);

module.exports = router;