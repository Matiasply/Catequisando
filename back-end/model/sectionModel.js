const pool = require('../config/db')

async function createSection(name, ordem) {

    const query = "INSERT INTO secoes (nome_secao, ordem) VALUES ($1, $2) RETURNING *";
    const values = [name, ordem]

    try {
        const result = await pool.query(query, values);
        return result.rows[0];
    } catch (error) {
        console.error("Error creating section");
        throw error;
    }
}

async function getAllSection(id_section) {

    const query = `SELECT * FROM get_secao_completa($1)`;
    const values = [id_section]

    try {
        const result = await pool.query(query, values);
        return result.rows
    } catch (error) {
        console.error("Error getting section", error)
        throw error;
    }
}

module.exports = {
    createSection,
    getAllSection
}