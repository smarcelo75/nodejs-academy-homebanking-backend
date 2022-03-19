const { Schema, model } = require('mongoose');
const accountSchema = new Schema({
    number: {
        type: String,
        required: true,
        unique: true
    },
    creationDate: {
        type: Date,
        default: Date.now
    },
    balance: {
        type: Number,
        required: true,
        default: 0
    },
    client: {
        type: Schema.Types.ObjectId,
        ref: 'client',
        required: true
    },
    transactions: [{
        type: Schema.Types.ObjectId,
        ref: 'transaction',
        autopopulate: true
    }]
});

accountSchema.plugin(require('mongoose-autopopulate'));
module.exports = model('account', accountSchema);