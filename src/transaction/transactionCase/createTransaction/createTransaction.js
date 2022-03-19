const { response } = require('express');
const transactionRepository = require('../../../repositories/transactionRepository');
const accountRepository = require('../../../repositories/accountRepository');

const createTransaction = async(req, res = response) => {
    try {
        const transaction = await transactionRepository.save(req.body);
        res.status(201).json({
            message: 'Se creo una nueva transacción',
            response: transaction
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error interno del servidor',
            err: error
        });
    }
}

const createTransfer = async(req, res = response) => {
    try {
        const { fromAccountNumber, toAccountNumber, amount, description } = req.query;
        const fromAccount = await accountRepository.getOneByNumber(fromAccountNumber);
        if (!fromAccount) {
            return res.status(400).json({
                message: 'Cuenta origen incorrecta'
            });
        }
        const toAccount = await accountRepository.getOneByNumber(toAccountNumber);
        if (!toAccount) {
            return res.status(400).json({
                message: 'Cuenta destino incorrecta'
            });
        }
        const debit = {
            "type": "DEBIT",
            "amount": amount,
            "description": description,
            "account": fromAccount._id
        }
        await transactionRepository.save(debit);
        const credit = {
            "type": "CREDIT",
            "amount": amount,
            "description": description,
            "account": toAccount._id
        }
        await transactionRepository.save(credit);
        res.status(201).json({
            message: 'Se realizo la transferencia',
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error interno del servidor',
            err: error.message
        });
    }
}

module.exports = {
    createTransaction,
    createTransfer
}