const { Schema, model } = require('mongoose');
const TransctionType = {
    values: ['DEBIT', 'CREDIT'],
    message: '{VALUE} no es un tipo válido'
};
const transactionSchema = new Schema({
    type: {
        type: String,
        required: true,
        enum: TransctionType
    },
    amount: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        trim: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    account: {
        type: Schema.Types.ObjectId,
        ref: 'account',
        required: true
    }
});

module.exports = model('transaction', transactionSchema);