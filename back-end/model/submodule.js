const pool = require("../config/db")

async function createSubmodule(name, id_module, ordem) {

    const query = `INSERT INTO submodulos (nome_submodulo, id_modulo, ordem)
                    VALUES ($1, $2, $3) RETURNING *`

    const values = [name, id_module, ordem]

    try {
        const result = await pool.query(query, values)
        return result.rows[0];
    } catch (error) {
        console.error('Error creating submodule', error)
        throw error;
    }
}

module.exports = {
    createSubmodule
}