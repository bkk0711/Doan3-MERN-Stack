const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PostCmtSchema = new Schema({
    content: {
        type: String,
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
    post: {
        type: Schema.Types.ObjectId,
        ref: 'Posts'
    }

})

module.exports = mongoose.model('Post_Cmt', PostCmtSchema)