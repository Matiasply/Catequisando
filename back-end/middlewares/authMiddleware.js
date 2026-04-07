const jwt = require('jsonwebtoken');

function authenticate(req, res, next) {
    
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return res.status(401).json({ error: 'No token provided' });
    }

    // O token é esperado no formato "Bearer <token>"
    const token = authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Armazena o ID do usuário no objeto de requisição para uso posterior
        console.log('Decoded token: ', decoded); // Verifique o conteúdo do token decodificado
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Invalid token' });
    }

}

module.exports = authenticate;