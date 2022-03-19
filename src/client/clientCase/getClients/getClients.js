const { response } = require('express');
const clientRepository = require('../../../repositories/clientRepository');

const getClients = async(req, res = response) => {
    try {
        const clients = await clientRepository.getAll();
        const count = await clientRepository.count();
        if (!clients) {
            return res.status(404).json({
                message: 'Not Found'
            });
        }
        res.status(200).json({
            message: 'Clients',
            response: clients,
            total: count
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error interno del servidor',
            err: error
        });
    }
}

const getClient = async(req, res = response) => {
    const id = req.params.id;
    try {
        const client = await clientRepository.getOne(id);
        if (!client) {
            return res.status(404).json({
                message: 'Not Found'
            });
        }
        res.status(200).json({
            message: 'Client',
            response: client,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error interno del servidor',
            err: error
        });
    }
}

const getClientCurrent = async(req, res = response) => {
    const id = req.user.id;
    try {
        const client = await clientRepository.getOne(id);
        if (!client) {
            return res.status(404).json({
                message: 'Not Found'
            });
        }
        res.status(200).json({
            message: 'Client',
            response: client,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error interno del servidor',
            err: error
        });
    }
}

const getClientCurrentAccounts = async(req, res = response) => {
    const id = req.user.id;
    try {
        const client = await clientRepository.getOne(id);
        if (!client) {
            return res.status(404).json({
                message: 'Not Found'
            });
        }
        res.status(200).json({
            message: 'Client Accounts',
            response: client.accounts,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error interno del servidor',
            err: error
        });
    }
}

module.exports = {
    getClients,
    getClient,
    getClientCurrent,
    getClientCurrentAccounts
}