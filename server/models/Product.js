const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProductSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    type_product:{
        type: String,
        enum:['CODE', 'DOCUMENT', 'MEDIA'],
        required: true
        
    },
    category:{
        type: Schema.Types.ObjectId,
        ref: "categories",
    },
    price: {
        type: Number,
        required: true,
        default: 0
    },
    discount: {
        type: Number,
        default: 0
    },
    urlfile: {
        type: String,
        required: true
    },
    urldemo: {
        type: String,
    },
    tags: {
        type: Object,
        required: true
    },
    thumbnail:{
        type: String
    },
    status:{
        type: String,
        enum:['WAITING', 'OK', 'CANCEL'],
        default: "WAITING"
    },
    pRatingsReviews: [
        {
          review: String,
          user: { type: Schema.Types.ObjectId, ref: "users" },
          rating: String,
          createdAt: {
            type: Date,
            default: Date.now(),
          },
        },
      ],
      userId: {
        type: Schema.Types.ObjectId,
        ref: 'Users'
    }

}, { timestamps: true })

module.exports = mongoose.model('Products', ProductSchema)