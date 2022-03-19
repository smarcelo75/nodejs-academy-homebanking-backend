const { Schema, model } = require('mongoose');
const CardType = {
    values: ['DEBIT', 'CREDIT'],
    message: '{VALUE} no es un tipo válido'
};
const ColorType = {
    values: ['SILVER', 'GOLD', 'TITANIUM'],
    message: '{VALUE} no es un color válido'
};

const cardSchema = new Schema({
    type: {
        type: String,
        required: true,
        enum: CardType
    },
    color: {
        type: String,
        required: true,
        enum: ColorType
    },
    cardHolder: {
        type: String,
        required: true
    },
    number: {
        type: Number,
        required: true
    },
    cvv: {
        type: Number,
        required: true
    },
    fromDate: {
        type: Date,
        default: Date.now,
        required: true
    },
    thruDate: {
        type: Date,
        default: Date.now,
        required: true
    },
    client: {
        type: Schema.Types.ObjectId,
        ref: 'client',
        required: true
    },
});

cardSchema.plugin(require('mongoose-autopopulate'));
module.exports = model('card', cardSchema);