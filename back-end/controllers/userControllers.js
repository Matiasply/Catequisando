const userModel = require('../model/userModel');

async function createUser(req, res) {
    const { name, password } = req.body;

    try {
        const newUser = await userModel.createUser(name, password);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: 'Error creating user' });
    }
}

module.exports = {
    createUser
};