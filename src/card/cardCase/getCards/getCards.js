const { response } = require('express');
const cardRepository = require('../../../repositories/cardRepository');

const getCards = async(req, res = response) => {
    try {
        const cards = await cardRepository.getAll();
        const count = await cardRepository.count();
        if (!cards) {
            return res.status(404).json({
                message: 'Not Found'
            });
        }
        res.json({
            message: 'Cards',
            response: cards,
            total: count
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error interno del servidor',
            err: error
        });
    }
}

const getCard = async(req, res = response) => {
    const id = req.params.id;
    try {
        const card = await cardRepository.getOne(id);
        if (!card) {
            return res.status(404).json({
                message: 'Not Found'
            });
        }
        res.json({
            message: 'Card',
            response: card
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error interno del servidor',
            err: error
        });
    }
}

module.exports = {
    getCards,
    getCard
}