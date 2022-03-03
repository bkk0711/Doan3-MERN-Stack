const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ReviewSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    star:{
        type: Number,
        required: true
    },
    createAt:{
        type: Date,
        default: Date.now
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Users'
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Products'
    }

})

module.exports = mongoose.model('Reviews', ReviewSchema)