const moduleModel = require("../model/moduleModel")

async function createModule(req, res) {

    const name = req.body.name;
    const id_section = req.body.id_secao;
    const order = req.body.order;
    
    try {
        await moduleModel.createModule(name, id_section, order)
        return res.status(200).json({message: `Module ${name} created!`})
    } catch (error) {
        console.error("Error creating module", error)
        return res.status(500).json({error: 'Error creating module'})
    }
}

async function formatar_resposta(rows) {

const resultado = {
  id: rows[0].id_modulo,
  nome: rows[0].nome_modulo,
  submodulos: []
};

rows.forEach(row => {
  let submodulo = resultado.submodulos.find(sm => sm.id === row.submodulo_id);

  if (!submodulo) {
    submodulo = {
      id: row.submodulo_id,
      nome: row.submodulo_nome,
      aulas: []
    };
    resultado.submodulos.push(submodulo);
  }

  if (row.aula_id) {
      submodulo.aulas.push({
      id: row.aula_id,
      nome: row.aula_nome,
      conteudo: [
        {
        cabecalho: row.texto_cabecalho, texto: row.aula_texto, referencias: row.referencias,
        imagem: row.aula_img, video: row.aula_video, audio: row.aula_audio
        }
      ]
    });
  }
});
    return resultado;
}

async function getAllModule(req, res) {

    const id = req.params.id;
    console.log(id)

    try {
        const dados = await moduleModel.getAllModule(id)
        const resultado = await formatar_resposta(dados)
        return res.status(200).json(resultado)
    } catch (error) {
        console.error("Error getting module's informations", error)
        return res.status(404).json({error : "Data not found!"})
    }
}

module.exports = {
    createModule,
    getAllModule
}