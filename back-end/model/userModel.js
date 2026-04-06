const pool = require('../config/db');

async function createUser(name, password) {

    const query = 'INSERT INTO Usuario (name, password) VALUES ($1, $2) RETURNING *';
    const values = [name, password];

    try {
        const result = await pool.query(query, values);
        return result.rows[0];
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
}

module.exports = {
    createUser
};