const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('ProjetoB1', 'ProjetoB1', 'qwerpoiu', {
    host: 'localhost',
    dialect: 'mysql' 
});

sequelize.authenticate()
    .then(() => {
        console.log('Conexão com o banco de dados estabelecida com sucesso.');
    })
    .catch(err => {
        console.error('Erro ao conectar ao banco de dados:', err);
    });

const ProductModel = require('../models/Product')(sequelize);

module.exports = {
    sequelize,
    Product: ProductModel
};
