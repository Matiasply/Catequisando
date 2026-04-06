const authModel = require('../model/authModel');
const bcrypt = require('bcrypt'); //Criptografia para as senhas dos usuários
const jwt = require('jsonwebtoken'); //Para geração de tokens JWT

async function login(req, res) {
    const { email, password } = req.body;

    try {
        const user = await authModel.login(email);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.senha);

        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid password' });
        }

        const token = jwt.sign({ name: user.nome }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ message: 'Login successful', user, token });
    } catch (error) {
        res.status(500).json({ error: 'Error logging in' });
    }
}

module.exports = {
    login
};