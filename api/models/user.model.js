// model - для регистрации новой коллекции
// Schema - для создания схемы сущности
const { Schema, model } = require('mongoose');

const schema = new Schema({
    login: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    }
});

module.exports = model('users', schema);