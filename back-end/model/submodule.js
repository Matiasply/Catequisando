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

async function getAllSubmodule(id_submodule) {

    const query = `SELECT * FROM get_submodulo_completo($1)`
    const values = [id_submodule]

    try {
        const result = await pool.query(query, values);
        return result.rows;
    } catch (error) {
        console.error("Error getting submodule's information", error)
        throw error;
    }
}

module.exports = {
    createSubmodule,
    getAllSubmodule
}