// model - для регистрации новой коллекции
// Schema - для создания схемы сущности
const { Schema, model } = require('mongoose');

const schema = new Schema({
    title: {
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
    views: {
        type: Number,
        default: 0
    },
    imageUrl: String,
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: 'comments'
        }
    ]
});

module.exports = model('posts', schema);