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

async function getAllModule(id_modulo) {
   
    const query = `SELECT * FROM get_modulo_completo($1)`
    const values = [id_modulo]
    
    try {
        const result = await pool.query(query, values);
        return result.rows;
    } catch (error) {
        console.error ("Error getting module informations", error)
        throw error;
    }
}

module.exports = {
    createModule,
    getAllModule
}