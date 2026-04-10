const pool = require('../config/db')

async function createSession(name) {

    const query = "INSERT INTO secoes (nome_secao) VALUES ($1) RETURNING *";
    const values = [name]

    try {
        const result = await pool.query(query, values);
        return result.rows[0];
    } catch (error) {
        console.error("Error creating session");
        throw error;
    }
}

module.exports = {
    createSession
}