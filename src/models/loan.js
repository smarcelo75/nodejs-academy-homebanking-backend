const { Schema, model } = require('mongoose');

const loanSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    maxAmount: {
        type: Number,
        required: true
    },
    payments: [Number]
});

module.exports = model('loan', loanSchema);