// ./controllers/userController.js

class userController{
    constructor(UserService){
        this.userService = UserService;
    }
    async createUser(req, res){
        const {email,data_nascimento,password} = req.body;
        try{
            const newUser = this.userService.create(email,data_nascimento,password);
            res.status(200).json(newUser);
        }
        catch(error){
            res.status(500).json({error: 'Ocorreu um erro ao gravar um novo usuário.'})
        }
    }

    async findAllUsers(req,res){
        try{
            const AllUsers = await this.userService.findAll();
            res.status(200).json(AllUsers);
        }
        catch(error){
            res
                .status(500)
                .json({error: 'Ocorreu um erro ao localizar todos os usuários.'});
        }
    }

    async findUserById(req,res){
        const {id} = req.query;
        try{
            const User = await this.userService.findById(id);
            res.status(200).json(User);
        }
        catch(error){
            res
                .status(500)
                .json({error: 'Ocorreu um erro ao localizar os usuário pelo ID.'});
        }

    }

    async login(req,res){
        const {email,password} = req.body;
        try{
            const user = await this.UserService.login(email,password);
            res.status(200).json(User);
        }
        catch(error){
            res.status(500).json({error: 'Erro ao logar o usuario'})
        }
    }
}

module.exports = userController;