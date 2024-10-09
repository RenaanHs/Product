const Sequelize = require('sequelize');

const sequelize = new Sequelize('ProjetoB1', 'ProjetoB1', 'qwerpoiu', {
    host: 'localhost',
    dialect: 'mysql', 
    logging: false
});

module.exports = sequelize;