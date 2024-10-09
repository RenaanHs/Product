const Transaction = require('../models/Transaction');
const PaymentService = require('../Services/paymentService');

const paymentService = new PaymentService(Transaction);

const PaymentController = {
    async processCardPayment(req, res) {
        try {
            const { cardNumber, cvv, expirationDate, cardHolderName, userId } = req.body;

            const transaction = await paymentService.processPayment(
                userId,
                'CREDIT_CARD',
                { cardNumber, cvv, expirationDate, cardHolderName }
            );

            res.status(200).json({
                message: 'Pagamento em processamento',
                transactionId: transaction.id
            });
        } catch (error) {
            console.error('Erro ao processar pagamento:', error);
            res.status(error.message === 'Carrinho vazio' ? 400 : 500).json({
                error: error.message || 'Erro ao processar pagamento'
            });
        }
    },

    async processPixPayment(req, res) {
        try {
            const { userId } = req.body;

            const transaction = await paymentService.processPayment(userId, 'PIX');
            const pixCode = paymentService.generatePixCode();

            res.status(200).json({
                message: 'Código PIX gerado com sucesso',
                pixCode,
                transactionId: transaction.id,
                valorTotal: transaction.valorTotal
            });
        } catch (error) {
            console.error('Erro ao gerar PIX:', error);
            res.status(error.message === 'Carrinho vazio' ? 400 : 500).json({
                error: error.message || 'Erro ao gerar pagamento PIX'
            });
        }
    },

    async getTransactionStatus(req, res) {
        try {
            const { transactionId } = req.params;
            const transaction = await paymentService.getTransactionStatus(transactionId);

            res.status(200).json({
                transactionId: transaction.id,
                status: transaction.status,
                metodoPagamento: transaction.metodoPagamento,
                valorTotal: transaction.valorTotal,
                createdAt: transaction.createdAt
            });
        } catch (error) {
            console.error('Erro ao buscar status da transação:', error);
            res.status(error.message === 'Transação não encontrada' ? 404 : 500).json({
                error: error.message || 'Erro ao buscar status da transação'
            });
        }
    }
};

module.exports = PaymentController;