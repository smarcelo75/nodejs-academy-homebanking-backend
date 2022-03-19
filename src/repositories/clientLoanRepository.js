const ClientLoan = require('../models/clientLoan');
const Client = require('../models/client');

const getAll = async() => await ClientLoan.find();
const getOne = async(id) => await ClientLoan.findById(id);
const count = async() => await ClientLoan.count();

const save = async(body) => {
    const clientLoan = new ClientLoan({
        client: body.client,
        loan: body.loan,
        amount: body.amount,
        payments: body.payments
    });
    const clientLoanSaved = await clientLoan.save();
    const client = await Client.findById(clientLoanSaved.client);
    client.loans.push(clientLoanSaved._id);
    await Client.updateOne({ _id: client._id }, { loans: client.loans });
    return clientLoan;
}

module.exports = {
    getAll,
    getOne,
    count,
    save
}