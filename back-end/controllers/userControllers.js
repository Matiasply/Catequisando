const userModel = require('../model/userModel');
const bcrypt = require('bcrypt'); //Criptografia para as senhas dos usuários

async function createUser(req, res) {
    const { name, email, password } = req.body;

    // Criptografa a senha antes de armazenar no banco de dados
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const newUser = await userModel.createUser(name, email, hashedPassword);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: 'Error creating user' });
    }
}

async function getCurrentUser(req, res) {
    const userId = req.user.id; // O ID do usuário é definido pelo middleware de autenticação
    console.log('User ID from token:', userId); // Verifique se o ID do usuário está sendo extraído corretamente

    try {
        const user = await userModel.getUserById(userId);
        res.status(200).json(user);
    } catch (error) {
        console.error('Error fetching user: ', error);
        res.status(500).json({ error: 'Error fetching user' });
    }
}

module.exports = {
    createUser,
    getCurrentUser
};