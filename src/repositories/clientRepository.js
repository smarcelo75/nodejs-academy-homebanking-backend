const Client = require('../models/client');
const bcrypt = require('bcrypt');

const getAll = async() => await Client.find();
const getOne = async(id) => await Client.findById(id);
const count = async() => await Client.count();

const save = async(body) => {
    const client = new Client({
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        firstName: body.firstName,
        lastName: body.lastName,
    });
    await client.save();
    return client;
}

const signIn = async(email, password) => {
    let client = await Client.findOne({ email: email });
    if (client && !bcrypt.compareSync(password, client.password)) {
        client = null;
    }
    return client;
}

module.exports = {
    getAll,
    getOne,
    count,
    save,
    signIn
}