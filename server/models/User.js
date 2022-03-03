const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        maxlength: 32
    },
    password: {
        type: String,
        required: true
    },
    
    balance: {
        type: Number,
        default: 0
    },
    email:{
        type: String,
        required: true,
        trim: true,
        match: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
    },
    fullname: {
        type: String
    },
    phone:{
        type: String
    },
    avatar:{
        type: String,
        default: "user.png",
    },
    cover:{
        type: String
    },
    verified: {
        type: Boolean,
        default: false,
    },
    role:{
        type: String,
        enum: ['ADMIN', 'MOD', 'USER'],
        default: 'USER'
    },
    banks: [
        {
            stk_bank: String,
            name_bank: String,
            bank: String,
            chi_nhanh: String,
        }
      ]  
}, { timestamps: true }
)

module.exports = mongoose.model('Users', UserSchema)