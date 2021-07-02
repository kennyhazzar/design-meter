const { Schema, model } = require('mongoose')

const schema = new Schema({
    username: { type: String, unique: true, required: true }
})

module.exports = model('Layout', schema)
