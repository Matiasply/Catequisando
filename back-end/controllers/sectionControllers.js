const sectionModel = require("../model/sectionModel")


async function createSection(req, res) {

    const nome_secao = req.body.name;
    const ordem = req.body.ordem;
    console.log(nome_secao)

    try {
        await sectionModel.createSection(nome_secao, ordem);
        res.status(201).json({message: `Section ${nome_secao} created!`});
    } catch (error) {
        console.error("Error creating section: ", error);
       return res.status(500).json({error: `Error creating section: ${nome_secao}`});
       
    }
}

async function formatar_resposta(rows) {

const resultado = {
  id: rows[0].secao_id,
  nome: rows[0].secao_nome,
  conteudo: []
};

rows.forEach(row => {
  let modulo = resultado.conteudo.find(m => m.id === row.modulo_id);

  if (!modulo) {
    modulo = {
      id: row.modulo_id,
      nome: row.modulo_nome,
      submodulos: []
    };
    resultado.conteudo.push(modulo);
  }

  let submodulo = modulo.submodulos.find(s => s.id === row.submodulo_id);

  if (!submodulo) {
    submodulo = {
      id: row.submodulo_id,
      nome: row.submodulo_nome,
      aulas: []
    };
    modulo.submodulos.push(submodulo);
  }

  if (row.aula_id) {
      submodulo.aulas.push({
      id: row.aula_id,
      nome: row.nome
    });
  }
});
    return resultado;
}

async function getAllSection(req, res) {

    const id_secao = req.params.id;

    try {
        const result = await sectionModel.getAllSection(id_secao)
        const resultado = await formatar_resposta(result)
        res.status(200).json({resultado})
    } catch (error) {
        console.error("Error getting section", error)
        res.status(500).json({error: 'Error getting section info'})
    }
}

module.exports = {
    createSection,
    getAllSection
}