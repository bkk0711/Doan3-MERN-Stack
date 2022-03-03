const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PostSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    thumbnail:{
        type: String,
      
    },
    tags:{
        type: Object,
        required: true
    },
    status:{
        type: String,
        enum:['WAITING', 'OK', 'CANCEL'],
        default: "WAITING"
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'Users'
    }

}, { timestamps: true })

module.exports = mongoose.model('Posts', PostSchema)