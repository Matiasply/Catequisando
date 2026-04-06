const pool = require('../config/db');

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

module.exports = {
    login
};