const { response } = require('express');
const cardRepository = require('../../../repositories/cardRepository');

const createCard = async(req, res = response) => {
    try {
        const card = await cardRepository.save(req.body);
        res.status(201).json({
            message: 'Se creo una nueva tarjeta',
            response: card
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error interno del servidor',
            err: error
        });
    }
}

const createCardCurrentClient = async(req, res = response) => {
    const clientId = req.user.id;
    try {
        const data = {
            number: '5895620000000000',
            cardHolder: `${req.user.name}`,
            cvv: 123,
            type: req.query.cardType,
            color: req.query.cardColor,
            client: clientId,
        }
        const card = await cardRepository.save(data);
        res.status(201).json({
            message: 'Se creo una nueva tarjeta',
            response: card
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error interno del servidor',
            err: error.message
        });
    }
}

module.exports = {
    createCard,
    createCardCurrentClient
}