const { Schema, model } = require('mongoose')

const schema = new Schema({
    user: { type: Object, unique: false, required: true },
    message: { type: Object, unique: false, required: true },
    chatId: { type: Number, unique: true, required: true }
})

module.exports = model('Layout', schema)