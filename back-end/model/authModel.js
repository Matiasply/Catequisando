const pool = require('../config/db');
const crypto = require('crypto'); //Criptografia para os refresh tokens

async function login(email) {

    const query = 'SELECT * FROM Usuario WHERE email = $1';
    const values = [email];

    try {
        const result = await pool.query(query, values);
        return result.rows[0];
    } catch (error) {
        console.error('Error logging in:', error);
        throw error;
    }
}

function hashToken(token) {
  return crypto.createHash("sha256").update(token).digest("hex");
}

async function storeRefreshToken(userId, refreshToken) {

    const tokenHash = await hashToken(refreshToken);
    const query = 'INSERT INTO refresh_tokens (usuario_id, token_hash) VALUES ($1, $2)';
    const values = [userId, tokenHash];

    try {
        await pool.query(query, values);
    } catch (error) {
        console.error('Error storing refresh token:', error);
        throw error;
    }
}

async function verifyRefreshToken(refreshToken) {

    const tokenHash = await hashToken(refreshToken);
    
    const query = 'SELECT * FROM refresh_tokens WHERE token_hash = $1 AND revoked = false';
    const values = [tokenHash]

    try {
        const result = await pool.query(query, values);
        return result.rows[0];
    } catch (error) {
        console.error('Error verifying refresh token:', error);
        throw error;
    }
}

async function revokeRefreshToken(refreshToken) {

    const tokenHash = await hashToken(refreshToken);
    const query = 'UPDATE refresh_tokens SET revoked = true WHERE token_hash = $1';

    try {
        await pool.query(query, [tokenHash]);
    } catch (error) {
        console.error('Error revoking refresh token:', error);
        throw error;
    }
}

module.exports = {
    login,
    storeRefreshToken,
    verifyRefreshToken,
    revokeRefreshToken
};