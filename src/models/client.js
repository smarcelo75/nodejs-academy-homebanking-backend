const mongoose = require('mongoose');
const clientSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    accounts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'account',
        autopopulate: true
    }],
    loans: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'clientLoan',
        autopopulate: true
    }],
    cards: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'card',
        autopopulate: true
    }]
});

clientSchema.plugin(require('mongoose-autopopulate'));
module.exports = mongoose.model('client', clientSchema);