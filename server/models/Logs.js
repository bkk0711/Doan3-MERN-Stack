const mongoose = require('mongoose')
const Schema = mongoose.Schema

const LogSchema = new Schema({
    userFrom: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    userTo: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
    },
    _action: {
        type: String,

    },
    _value: {
        type: String
    },
    _payload: {
        type: Object
    }


}, { timestamps: true })

module.exports = mongoose.model('Logs', LogSchema)