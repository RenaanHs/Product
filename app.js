const express = require('express');
const cors = require('cors');
const sequelize = require('./db/config');
const productRoutes = require('./routes/products');
const cartRoutes = require('./routes/cart');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Logging middleware
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    console.log('Body:', req.body);
    next();
});

// Rotas
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);

// Inicialização
const PORT = process.env.PORT || 3000;

sequelize.authenticate()
    .then(() => {
        console.log('Conexão com o banco de dados estabelecida com sucesso.');
        return sequelize.sync({ alter: true });
    })
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Servidor rodando na porta ${PORT}`);
        });
    })
    .catch(err => {
        console.error('Erro ao iniciar o servidor:', err);
    });

module.exports = app;