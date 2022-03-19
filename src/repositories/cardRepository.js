const Card = require('../models/card');
const Client = require('../models/client');

const getAll = async() => await Card.find();
const getOne = async(id) => await Card.findById(id);
const count = async() => await Card.count();

const save = async(body) => {
    const card = new Card({
        number: body.number,
        cardHolder: body.cardHolder,
        cvv: body.cvv,
        type: body.type,
        color: body.color,
        client: body.client,
        fromDate: body.fromDate,
        thruDate: body.thruDate,
    });
    const cardSaved = await card.save();
    const client = await Client.findById(cardSaved.client);
    client.cards.push(cardSaved._id);
    await Client.updateOne({ _id: client._id }, { cards: client.cards });
    return card;
}

module.exports = {
    getAll,
    getOne,
    count,
    save
}