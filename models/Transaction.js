'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    static associate(models) {
      // Define associations here if needed
      // For example: this.belongsTo(models.User, { foreignKey: 'userId' });
    }
  }

  Transaction.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    valorTotal: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    metodoPagamento: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Transaction',
  });

  return Transaction;
};