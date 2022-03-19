const Loan = require('../models/loan');

const getAll = async() => await Loan.find();
const getOne = async(id) => await Loan.findById(id);
const count = async() => await Loan.count();

const save = async(body) => {
    const loan = new Loan({
        name: body.name,
        maxAmount: body.maxAmount,
        payments: body.payments
    });

    await loan.save();
    return loan;
}

module.exports = {
    getAll,
    getOne,
    count,
    save
}