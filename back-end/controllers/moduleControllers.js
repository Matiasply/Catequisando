const moduleModel = require("../model/moduleModel")

async function createModule(req, res) {

    const name = req.body.name;
    const id_session = req.body.id_secao;
    const order = req.body.order;
    
    try {
        await moduleModel.createModule(name, id_session, order)
        return res.status(200).json({message: `Module ${name} created!`})
    } catch (error) {
        console.error("Error creating module", error)
        return res.status(500).json({error: 'Error creating module'})
    }
}

module.exports = {
    createModule
}