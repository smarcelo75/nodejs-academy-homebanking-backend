const { response } = require('express');
const accountRepository = require('../../../repositories/accountRepository');

const getAccounts = async(req, res = response) => {
    try {
        const accounts = await accountRepository.getAll();
        const count = await accountRepository.count();
        if (!accounts) {
            return res.status(404).json({
                message: 'Not Found'
            });
        }
        res.json({
            message: 'Accounts',
            response: accounts,
            total: count
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error interno del servidor',
            err: error
        });
    }
}

const getAccount = async(req, res = response) => {
    const id = req.params.id;
    try {
        const account = await accountRepository.getOne(id);
        if (!account) {
            return res.status(404).json({
                message: 'Not Found'
            });
        }
        res.json({
            message: 'Account',
            response: account
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error interno del servidor',
            err: error
        });
    }
}

module.exports = {
    getAccounts,
    getAccount
}