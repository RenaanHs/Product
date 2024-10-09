const Cart = require('../models/cart');
const Product = require('../models/Product');

const CartController = {
    // Adicionar ao carrinho
    async addToCart(req, res) {
        try {
            const { productId, quantidade } = req.body;

            // Validar entrada
            if (!productId || !quantidade) {
                return res.status(400).json({
                    error: 'ProductId e quantidade são obrigatórios'
                });
            }

            // Verificar se produto existe
            const product = await Product.findByPk(productId);
            if (!product) {
                return res.status(404).json({
                    error: 'Produto não encontrado'
                });
            }

            // Verificar estoque
            if (product.estoque < quantidade) {
                return res.status(400).json({
                    error: 'Quantidade solicitada indisponível em estoque',
                    estoqueDisponivel: product.estoque
                });
            }

            // Verificar se já existe no carrinho
            let cartItem = await Cart.findOne({
                where: { productId }
            });

            if (cartItem) {
                // Atualizar quantidade
                cartItem.quantidade += quantidade;
                await cartItem.save();
            } else {
                // Criar novo item
                cartItem = await Cart.create({
                    productId,
                    quantidade
                });
            }

            // Buscar item atualizado com dados do produto
            const updatedItem = await Cart.findOne({
                where: { id: cartItem.id },
                include: [{
                    model: Product,
                    attributes: ['nome', 'preco', 'estoque']
                }]
            });

            res.status(200).json({
                message: 'Produto adicionado ao carrinho com sucesso',
                item: updatedItem
            });

        } catch (error) {
            console.error('Erro ao adicionar ao carrinho:', error);
            res.status(500).json({
                error: 'Erro ao adicionar item ao carrinho'
            });
        }
    },

    // Remover do carrinho
    async removeFromCart(req, res) {
        try {
            const { id } = req.params;

            const deleted = await Cart.destroy({
                where: { id }
            });

            if (deleted) {
                res.status(200).json({
                    message: 'Item removido do carrinho com sucesso'
                });
            } else {
                res.status(404).json({
                    error: 'Item não encontrado no carrinho'
                });
            }
        } catch (error) {
            console.error('Erro ao remover do carrinho:', error);
            res.status(500).json({
                error: 'Erro ao remover item do carrinho'
            });
        }
    },

    // Visualizar carrinho
    async getCart(req, res) {
        try {
            const cartItems = await Cart.findAll({
                include: [{
                    model: Product,
                    attributes: ['nome', 'preco', 'estoque']
                }],
                order: [['id', 'ASC']]
            });

            // Calcular total do carrinho
            const total = cartItems.reduce((acc, item) => {
                return acc + (item.Product.preco * item.quantidade);
            }, 0);

            res.status(200).json({
                items: cartItems,
                total: total,
                quantidade: cartItems.length
            });
        } catch (error) {
            console.error('Erro ao buscar carrinho:', error);
            res.status(500).json({
                error: 'Erro ao buscar itens do carrinho'
            });
        }
    }
};

module.exports = CartController;