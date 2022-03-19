const { Schema, model } = require('mongoose');

const clientLoanSchema = new Schema({
    client: {
        type: Schema.Types.ObjectId,
        ref: 'client',
        required: true
    },
    loan: {
        type: Schema.Types.ObjectId,
        ref: 'loan',
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    payments: {
        type: Number,
        required: true
    }
});

module.exports = model('clientLoan', clientLoanSchema);