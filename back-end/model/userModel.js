const pool = require('../config/db');

async function createUser(name, email, password) {

    const query = 'INSERT INTO Usuario (nome, email, senha) VALUES ($1, $2, $3) RETURNING *';
    const values = [name, email, password];

    try {
        const result = await pool.query(query, values);
        return result.rows[0];
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
}

async function getUserById(id) {

    const query = 'SELECT * FROM perfil_usuario WHERE id_usuario = $1';
    const values = [id];

    try {
        const result = await pool.query(query, values);
        return result.rows;
    } catch(error) {
        console.error('Error getting user informations: ', error);
        throw error;
    }
    
}

module.exports = {
    createUser,
    getUserById
};