const { DataTypes } = require('sequelize');
const sequelize = require('../db/config');
const Product = require('./Product');

const Cart = sequelize.define('Cart', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    quantidade: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
        validate: {
            min: 1
        }
    }
});

Cart.belongsTo(Product, { foreignKey: 'productId' });

module.exports = Cart;