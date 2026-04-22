const subModel = require("../model/submodule")

async function createSubmodule(req, res) {

    const name = req.body.name;
    const modulo = req.body.id_modulo;
    const ordem = req.body.ordem;

    try {
        await subModel.createSubmodule(name, modulo, ordem);
        res.status(200).json({message: `Submodule ${name} created!`})
    } catch (error) {
        console.error('Error creating submodule', error)
        res.status(500).json({error: `Error creating submodule ${name}`})
    }
}

async function getAllSubmodule(req, res) {
   
    const id = req.params.id;

    try {
        const dados = subModel.getAllSubmodule(id);
        return res.status(200).json(dados)
    } catch (error) {
        console.error("Error getting information", error)
        return res.status(404).json({error : "Data not found"})
    }
}


module.exports = {
    createSubmodule,
    getAllSubmodule
}