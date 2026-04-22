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

async function getAllModule(req, res) {

    const id = req.params.id;
    console.log(id)

    try {
        const dados = await moduleModel.getAllModule(id)
        return res.status(200).json(dados)
    } catch (error) {
        console.error("Error getting module's informations", error)
        return res.status(404).json({error : "Data not found!"})
    }
}

module.exports = {
    createModule,
    getAllModule
}