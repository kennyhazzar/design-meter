const { Schema, model } = require('mongoose')

const schema = new Schema({
    user: { type: Object, unique: false, required: true },
    messageId: { type: Number, unique: false, required: true },
    chatId: { type: Number, unique: false, required: true },
    username: { type: Object, unique: false, required: true }
})

module.exports = model('Layout', schema)