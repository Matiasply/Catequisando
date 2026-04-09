const authModel = require('../model/authModel');
const bcrypt = require('bcrypt'); //Criptografia para as senhas dos usuários
const jwt = require('jsonwebtoken'); //Para geração de tokens JWT
const pool = require('../config/db');

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

        const token = jwt.sign({ id: user.id_usuario, name: user.nome, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        const refreshToken = jwt.sign({ id: user.id_usuario }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });

        await authModel.storeRefreshToken(user.id_usuario, refreshToken);

        res.status(200).json({ message: 'Login successful', user, token });
    } catch (error) {
        res.status(500).json({ error: 'Error logging in' });
    }
}

async function refreshToken(req, res) {

    const refreshToken = req.body;

    if (!refreshToken) {
        return res.status(400).json({ error: 'No refresh token provided' });
    }

    //Verifica se o refresh token é válido e não foi revogado
    try {
        const tokenData = await authModel.verifyRefreshToken(refreshToken);

        if (!tokenData) {
            return res.status(401).json({ error: 'Invalid refresh token' });
        }
    } catch (error) {
        return res.status(500).json({ error: 'Error verifying refresh token' });
    }

    //Revoga o refresh token antigo para evitar reutilização
    try {
        await authModel.revokeRefreshToken(refreshToken);
    } catch (error) {
        return res.status(500).json({ error: 'Error revoking refresh token' });
    }

    //Gera um novo token de acesso
    try {
        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

        const newToken = jwt.sign({ id: decoded.id, name: decoded.name, role: decoded.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ token: newToken });
    } catch (error) {
        res.status(401).json({ error: 'Invalid refresh token' });
    }
}

async function logout(req, res) {

    const refreshToken = req.body;

    if (!refreshToken) {
        return res.status(400).json({ error: 'No refresh token provided' });
    }

    //Verifica se o refresh token é válido e não foi revogado
    try {
        const tokenData = await authModel.verifyRefreshToken(refreshToken);

        if (!tokenData) {
            return res.status(401).json({ error: 'Invalid refresh token' });
        }
    } catch (error) {
        return res.status(500).json({ error: 'Error verifying refresh token' });
    }

    //Revoga o refresh token
    try {
        await authModel.revokeRefreshToken(refreshToken)
    } catch (error) {
        res.status(500).json({error: 'Error revoking refresh token'})
    }
}

module.exports = {
    login,
    refreshToken,
    logout
};