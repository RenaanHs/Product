const express = require('express');
const router = express.Router();
const PaymentController = require('../controllers/PaymentController');
const PaymentService = require('../Services/paymentService');

const { Transaction, Cart, Product } = require('../models');

const paymentService = new PaymentService(Transaction, Cart, Product);
const paymentController = new PaymentController(paymentService);

router.post('/card', paymentController.processCardPayment.bind(paymentController));
router.post('/pix', paymentController.processPixPayment.bind(paymentController));
router.get('/status/:id', paymentController.getTransactionStatus.bind(paymentController));

module.exports = router;
