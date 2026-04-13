const sessionModel = require("../model/sessionModel")


async function createSession(req, res) {

    const nome_secao = req.body.name;
    const ordem = req.body.ordem;
    console.log(nome_secao)

    try {
        await sessionModel.createSession(nome_secao, ordem);
        res.status(201).json({message: `Session ${nome_secao} created!`});
    } catch (error) {
        console.error("Error creating session: ", error);
       return res.status(500).json({error: `Error creating session: ${nome_secao}`});
       
    }
}

async function getAllSection(req, res) {

    const id_secao = req.params.id;

    try {
        const result = await sessionModel.getAllSection(id_secao)
        res.status(200).json({result})
    } catch (error) {
        console.error("Error getting section", error)
        res.status(500).json({error: 'Error getting section info'})
    }
}

module.exports = {
    createSession,
    getAllSection
}