const { response } = require('express');
const transactionRepository = require('../../../repositories/transactionRepository');

const getTransactions = async(req, res = response) => {
    try {
        const transactions = await transactionRepository.getAll();
        const count = await transactionRepository.count();
        if (!transactions) {
            return res.status(404).json({
                message: 'Not Found'
            });
        }
        res.json({
            message: 'Transactions',
            response: transactions,
            total: count
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error interno del servidor',
            err: error
        });
    }
}

const getTransaction = async(req, res = response) => {
    const id = req.params.id;
    try {
        const transaction = await transactionRepository.getOne(id);
        if (!transaction) {
            return res.status(404).json({
                message: 'Not Found'
            });
        }
        res.json({
            message: 'Transaction',
            response: transaction
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error interno del servidor',
            err: error
        });
    }
}

module.exports = {
    getTransactions,
    getTransaction
}