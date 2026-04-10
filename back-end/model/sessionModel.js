const pool = require('../config/db')

async function createSession(name, ordem) {

    const query = "INSERT INTO secoes (nome_secao, ordem) VALUES ($1, $2) RETURNING *";
    const values = [name, ordem]

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