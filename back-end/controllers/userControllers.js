const userModel = require('../model/userModel');
const bcrypt = require('bcrypt'); //Criptografia para as senhas dos usuários

async function createUser(req, res) {
    const { name, password } = req.body;

    // Criptografa a senha antes de armazenar no banco de dados
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const newUser = await userModel.createUser(name, hashedPassword);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: 'Error creating user' });
    }
}

module.exports = {
    createUser
};