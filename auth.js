const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt'); 
require('dotenv').config(); 

const auth = {
    generateToken: (user) => {
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: '24h' // O token expira em 24 horas
        });
        return token;
    },

    verifyToken: (req, res, next) => {
        const token = req.headers['authorization'];
        if (!token) {
            return res.status(403).json({ error: 'Token não fornecido.' });
        }

        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({ error: 'Falha ao autenticar o token.' });
            }
            req.userId = decoded.id; 
            next(); 
        });
    },

    hashPassword: async (password) => {
        const saltRounds = 10; 
        const hash = await bcrypt.hash(password, saltRounds);
        return hash;
    },

    checkPassword: async (password, hash) => {
        const match = await bcrypt.compare(password, hash);
        return match;
    }
};

module.exports = auth;
