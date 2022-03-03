const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CheckinSchema = new Schema({
    product: {
        type: Object,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    }

}, { timestamps: true })

module.exports = mongoose.model('Checkin', CheckinSchema)