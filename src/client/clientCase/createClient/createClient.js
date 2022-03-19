const { response } = require('express');
const clientRepository = require('../../../repositories/clientRepository');

const createClient = async(req, res = response) => {
    try {
        const client = await clientRepository.save(req.body);
        res.status(201).json({
            message: 'Se creo un nuevo cliente',
            response: client
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error interno del servidor',
            err: error,
        });
    }
}

module.exports = {
    createClient
}