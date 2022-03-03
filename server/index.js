const express = require('express')
const mongoose =  require('mongoose')
const cors = require('cors')

const AuthRouter = require('./routes/Auth')
const PostRouter = require('./routes/Post')
const CateRouter = require('./routes/Category')
const ProductRouter = require('./routes/Product')
const Cart = require('./routes/Cart')
const Checkout = require('./routes/Checkout')
var path = require('path');
require('dotenv').config()

const connectDB = async ()=>{
    try {
        await mongoose.connect(
            `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.vs49e.mongodb.net/Cluster0?retryWrites=true&w=majority`, 
            {
                // useCreateIndex: true,
				useNewUrlParser: true,
				useUnifiedTopology: true,
				// useFindAndModify: false
            }
        )
        console.log("Connected")
    } catch (error) {
        console.log(error.message)
        process.exit(1)
    }
}

connectDB()
const app = express()
app.use(express.json())
app.use(cors())

// app.use(express.static("public"));
app.use('/public', express.static(path.join(__dirname, 'public')));
// app.get('/' , (req , res)=>{

//    res.send('hello from simple server :)')

// })

app.use('/api/auth', AuthRouter)

app.use('/api/posts', PostRouter)

app.use('/api/categories', CateRouter)

app.use('/api/product', ProductRouter)

app.use('/api/cart', Cart)

app.use('/api/checkout', Checkout)

const PORT = 5000

app.listen(PORT, ()=> console.log(`Server started on port ${PORT}`))