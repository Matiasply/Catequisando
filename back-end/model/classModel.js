const pool = require("../config/db")

async function createClass(name, id_submodulo, ordem, id_texto, url_imagem, url_video) {

    const query = `INSERT INTO aula (nome, id_submodulo, ordem, id_texto, url_video, url_imagem)
                    VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;

    const values = [name, id_submodulo, ordem, id_texto, url_imagem, url_video];
    console.log(values)

    try {
        const result = await pool.query(query, values);
        return result.rows;
    } catch (error) {
        console.error('Error creating class', error);
        throw error;
    };
    
}

module.exports = {
    createClass
}