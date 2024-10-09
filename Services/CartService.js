class CartService {
    constructor(CartModel) {
        this.Cart = CartModel;
    }

    async addProduct(userId, productId, quantidade) {
        const cart = await this.Cart.findOne({ where: { userId } });
        const product = await db.Product.findByPk(productId);
        if (!product) throw new Error('Produto não encontrado.');
        
        let updatedItems;
        if (cart) {
            updatedItems = [...cart.itens, { productId, nome: product.nome, quantidade, preco: product.preco * quantidade }];
            return await cart.update({ itens: updatedItems });
        }
        
        updatedItems = [{ productId, nome: product.nome, quantidade, preco: product.preco * quantidade }];
        return await this.Cart.create({ userId, itens: updatedItems });
    }

    async removeProduct(id) {
        return await this.Cart.destroy({ where: { id } });
    }

    async viewCart(userId) {
        return await this.Cart.findOne({ where: { userId } });
    }
}

module.exports = CartService;
