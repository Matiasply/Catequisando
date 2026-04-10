const sessionModel = require("../model/sessionModel")


async function createSession(req, res) {

    const nome_secao = req.body.name;
    console.log(nome_secao)

    try {
        await sessionModel.createSession(nome_secao);
        res.status(201).json({message: `Session ${nome_secao} created!`});
    } catch (error) {
        console.error("Error creating session: ", error);
       return res.status(500).json({error: `Error creating session: ${nome_secao}`});
       
    }
}

module.exports = {
    createSession
}