const { response } = require('express');
const loanRepository = require('../../../repositories/loanRepository');

const createLoan = async(req, res = response) => {
    try {
        const loan = await loanRepository.save(req.body);
        res.status(201).json({
            message: 'Se creó un nuevo tipo de prestamo',
            response: loan
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error interno del servidor',
            err: error
        });
    }
}

module.exports = {
    createLoan
}