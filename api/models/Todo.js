// model - для регистрации новой коллекции
// Schema - для создания схемы сущности
const { Schema, model } = require('mongoose');

const schema = Schema({
    title: {
        type: String,
        required: true,
        //unique: true
        //minLength: 6 // 6 символов
    },
    completed: {
        type: Boolean,
        default: false
    }
});

module.exports = model('Todo', schema);