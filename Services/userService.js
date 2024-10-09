// ./services/userServices.js

const { where } = require("sequelize");
const auth = require('../auth');
const db = require = ('../models');

class UserServices {
    constructor(UserModel) {
        this.User = UserModel;
    }

    async create(email, data_nascimento, password) {
        try {
            const newUser = await this.User.create({
                email: email,
                data_nascimento: data_nascimento,
                password: password
            });
            return newUser? newUser : null;
            
        }
        catch (error) {
            throw error;
        }
    }
    //Método para retornar todos os usuários
    async findAll()
    {
        try{
            const AllUsers = await this.User.findAll();
            return AllUsers? AllUsers : null;
        }
        catch(error){
            throw error;
        }

    }

    //Método para retornar o usuário pelo id
    async findById(id){
        try{
            const User = await this.User.findByPk(id);
            return User? User: null;
        }
        catch(error){
            throw error;
        }

    }

    //metodo para login
    async login(email, password){
        try {
            const user = await this.User.findOne({
                where : {email}
        });
            if (user) {
                // preencher deopois, pq a senha precisa ser criptografada
                //Gerar token do user
                const token = await auth.generateToken(this.User);
                User.dataValues.Token = token;
                User.dataValues.password = '';
            }
            return User? User:null;
        } catch (error) {
            throw error;
        }
       
    }
}

module.exports = UserServices;