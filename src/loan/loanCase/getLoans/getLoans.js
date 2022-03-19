const { response } = require('express');
const loanRepository = require('../../../repositories/loanRepository');

const getLoans = async(req, res = response) => {
    try {
        const loans = await loanRepository.getAll();
        const count = await loanRepository.count();
        if (!loans) {
            return res.status(404).json({
                message: 'Not Found'
            });
        }
        res.json({
            message: 'Loans',
            response: loans,
            total: count
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error interno del servidor',
            err: error
        });
    }
}

const getLoan = async(req, res = response) => {
    const id = req.params.id;
    try {
        const loan = await loanRepository.getOne(id);
        if (!loan) {
            return res.status(404).json({
                message: 'Not Found'
            });
        }
        res.json({
            message: 'Loan',
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
    getLoans,
    getLoan
}