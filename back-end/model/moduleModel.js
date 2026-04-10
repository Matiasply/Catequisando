const pool = require("../config/db")

async function createModule(name, id_secao, ordem) {

    const query = `INSERT INTO modulos (nome_modulo, id_secao, ordem)
                    VALUES($1, $2, $3) RETURNING *`
    
    const values = [name, id_secao, ordem]

    try {
        const result = await pool.query(query, values)
        return result.rows[0];
    } catch (error) {
        console.error ("Error creating module")
        throw error;
    }
}

module.exports = {
    createModule
}