const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CartSchema = new Schema({
    product: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Products'
        }
    ]
    ,
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'Users'
    }
}, { timestamps: true }
)

module.exports = mongoose.model('Cart', CartSchema)