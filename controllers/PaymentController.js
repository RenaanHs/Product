const Transaction = require('../models/Transaction');
const Cart = require('../models/cart');

const PaymentController = {
    async processCardPayment(req, res) {
        try {
            const { cardNumber, cvv, expirationDate, cardHolderName, userId } = req.body;

            // Validação básica do cartão
            if (!cardNumber || !cvv || !expirationDate || !cardHolderName) {
                return res.status(400).json({
                    error: 'Todos os dados do cartão são obrigatórios'
                });
            }

            // Buscar o carrinho do usuário
            const cartItems = await Cart.findAll({
                where: { userId },
                include: ['Product']
            });

            if (cartItems.length === 0) {
                return res.status(400).json({
                    error: 'Carrinho vazio'
                });
            }

            // Calcular valor total
            const valorTotal = cartItems.reduce((total, item) => {
                return total + (item.quantidade * item.Product.preco);
            }, 0);

            // Criar transação
            const transaction = await Transaction.create({
                userId,
                valorTotal,
                metodoPagamento: 'CREDIT_CARD',
                status: 'PENDING'
            });

            // Simular processamento do pagamento
            setTimeout(async () => {
                try {
                    await transaction.update({ status: 'COMPLETED' });
                    // Aqui você poderia adicionar lógica para limpar o carrinho,
                    // atualizar estoque, enviar email de confirmação, etc.
                } catch (error) {
                    console.error('Erro ao atualizar status da transação:', error);
                    await transaction.update({ status: 'FAILED' });
                }
            }, 2000);

            res.status(200).json({
                message: 'Pagamento em processamento',
                transactionId: transaction.id
            });

        } catch (error) {
            console.error('Erro ao processar pagamento:', error);
            res.status(500).json({
                error: 'Erro ao processar pagamento'
            });
        }
    },

    async processPixPayment(req, res) {
        try {
            const { userId } = req.body;

            // Buscar o carrinho do usuário
            const cartItems = await Cart.findAll({
                where: { userId },
                include: ['Product']
            });

            if (cartItems.length === 0) {
                return res.status(400).json({
                    error: 'Carrinho vazio'
                });
            }

            // Calcular valor total
            const valorTotal = cartItems.reduce((total, item) => {
                return total + (item.quantidade * item.Product.preco);
            }, 0);

            // Criar transação
            const transaction = await Transaction.create({
                userId,
                valorTotal,
                metodoPagamento: 'PIX',
                status: 'PENDING'
            });

            // Gerar código PIX (simulado)
            const pixCode = `PIX${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

            res.status(200).json({
                message: 'Código PIX gerado com sucesso',
                pixCode,
                transactionId: transaction.id,
                valorTotal
            });

        } catch (error) {
            console.error('Erro ao gerar PIX:', error);
            res.status(500).json({
                error: 'Erro ao gerar pagamento PIX'
            });
        }
    },

    async getTransactionStatus(req, res) {
        try {
            const { transactionId } = req.params;

            const transaction = await Transaction.findByPk(transactionId);

            if (!transaction) {
                return res.status(404).json({
                    error: 'Transação não encontrada'
                });
            }

            res.status(200).json({
                transactionId: transaction.id,
                status: transaction.status,
                metodoPagamento: transaction.metodoPagamento,
                valorTotal: transaction.valorTotal,
                createdAt: transaction.createdAt
            });

        } catch (error) {
            console.error('Erro ao buscar status da transação:', error);
            res.status(500).json({
                error: 'Erro ao buscar status da transação'
            });
        }
    }
};

module.exports = PaymentController;