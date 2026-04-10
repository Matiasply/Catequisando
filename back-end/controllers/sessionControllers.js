const sessionModel = require("../model/sessionModel")


async function createSession(req, res) {

    const nome_sessao = req.body.name;
    console.log(nome_sessao)

    try {
        await sessionModel.createSession(nome_sessao);
        res.status(201).json({message: `Session ${nome_sessao} created!`});
    } catch (error) {
        console.error("Error creating session: ", error);
       return res.status(500).json({error: `Error creating session: ${nome_sessao}`});
       
    }
}

module.exports = {
    createSession
}