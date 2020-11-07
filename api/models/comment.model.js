// model - для регистрации новой коллекции
// Schema - для создания схемы сущности
const { Schema, model } = require('mongoose');

const schema = new Schema({
    name: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    postId: {
        ref: 'posts',
        type: Schema.Types.ObjectId
    }
});

module.exports = model('comments', schema);