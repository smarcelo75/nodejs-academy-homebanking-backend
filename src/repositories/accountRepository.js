const Account = require('../models/account');
const Client = require('../models/client');

const getAll = async() => await Account.find();
const getOne = async(id) => await Account.findById(id);
const getOneByNumber = async(number) => await Account.findOne({ number: number });
const count = async() => await Account.count();

const save = async(body) => {
    const account = new Account({
        number: body.number,
        balance: body.balance,
        creationDate: body.creationDate,
        client: body.client
    });
    const accountSaved = await account.save();
    const client = await Client.findById(accountSaved.client);
    client.accounts.push(accountSaved._id);
    await Client.updateOne({ _id: client._id }, { accounts: client.accounts });
    return account;
}

module.exports = {
    getAll,
    getOne,
    getOneByNumber,
    count,
    save
}