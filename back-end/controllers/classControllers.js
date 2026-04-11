const classModel = require("../model/classModel")

async function createClass(req, res) {

    const name = req.body.name;
    const id_submodulo = req.body.id_submodulo;
    const ordem = req.body.ordem;
    const imagem = req.body.url_imagem;
    const texto = req.body.texto;
    const video = req.body.video;

    try {
        await classModel.createClass(name, id_submodulo, ordem, texto, video, imagem)
        res.status(200).json({message: `Class ${name} created!`})
    } catch (error) {
        res.status(500).json({error: 'Error creating class'})
    }
}

module.exports = {
    createClass
};