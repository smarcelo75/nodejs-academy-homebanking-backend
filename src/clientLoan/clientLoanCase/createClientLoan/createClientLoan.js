const { response } = require('express');
const clientLoanRepository = require('../../../repositories/clientLoanRepository');

const createClientLoan = async(req, res = response) => {
    try {
        const clientLoan = await clientLoanRepository.save(req.body);
        res.status(201).json({
            message: 'Se solicitó un nuevo prestamo para el cliente',
            response: clientLoan
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error interno del servidor',
            err: error.message
        });
    }
}

const createLoanCurrentClient = async(req, res = response) => {
    const clientId = req.user.id;
    try {
        const data = {
            client: clientId,
            loan: req.body.loanId,
            amount: req.body.amount,
            payments: req.body.payments
        }
        const clientLoan = await clientLoanRepository.save(data);
        res.status(201).json({
            message: 'Se creo una nueva solicitud de préstamo',
            response: clientLoan
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error interno del servidor',
            err: error.message
        });
    }
}

module.exports = {
    createClientLoan,
    createLoanCurrentClient
}