const jwt = require('jsonwebtoken')

function admAuthenticate(req, res, next) {

    const authHeader = req.headers["authorization"];

    if (!authHeader) {
        return res.status(401).json({ error : 'No token provided'})
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error : 'No token provided'})
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (typeof decoded.role === "undefined") {
            return res.status(403).json({ error : 'Adm only'})
        }
        
        if(decoded.role !== "adm") {
            return res.status(403).json({ error : 'Adm only'})
        }
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Invalid token' });
    }

}

module.exports = admAuthenticate