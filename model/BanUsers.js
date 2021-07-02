const { Schema, model } = require('mongoose')

const schema = new Schema({ username: { type: String, required: true, unique: true } })
// user_id: { type: String || Number, required: true, unique: true }

module.exports = model('BanUsers', schema)