const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.header('token');
    if (!token) {
        return res.status(401).json({
            message: 'Acceso denegado'
        });
    }
    try {
        const payload = jwt.verify(token, process.env.SECRET_KEY);
        req.user = payload;
        next();
    } catch (error) {
        res.status(400).json({
            message: 'El token no es válido'
        });
    }
}

module.exports = {
    verifyToken
}