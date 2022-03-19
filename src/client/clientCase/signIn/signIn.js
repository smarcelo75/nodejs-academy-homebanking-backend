const { response } = require('express');
const clientRepository = require('../../../repositories/clientRepository');
const jwt = require('jsonwebtoken');

const signIn = async(req, res = response) => {
    const { email, password } = req.body;
    const client = await clientRepository.signIn(email, password);
    if (!client) {
        return res.status(400).json({
            message: 'Usuario o contraseña no válida'
        });
    }
    const token = jwt.sign({
        name: `${client.firstName} ${client.lastName}`,
        id: client._id
    }, process.env.SECRET_KEY);
    res.json({
        message: `¡Bienvenido ${client.firstName} ${client.lastName}!`,
        token
    });
}

const signOut = (req, res = response) => {

    res.redirect('/');
}

module.exports = {
    signIn,
    signOut
}