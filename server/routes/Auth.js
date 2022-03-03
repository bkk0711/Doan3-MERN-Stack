const express = require('express')
const router = express.Router()
const User = require('../models/User')
const argon2 = require('argon2')
const jwt = require('jsonwebtoken')
const validator = require("email-validator")
const verifyToken = require('../middleware/Auth')


const _Cart = require('../models/Cart')
const _Product = require('../models/Product')
const _Checkout = require('../models/Checkout')
const _Post = require('../models/Post')
const _Logs = require('../models/Logs')

//@router POST api/auth/register
//@access public
//@desc Register User
router.post(
    '/register',
    async (req, res) =>{
        const {fullname, username, password, email} = req.body
        // check rỗng
        if(!username || !password || !email || !fullname)
            return res.status(400).json({success: false, message:'Vui lòng điền đầy đủ các trường dữ liệu'})   

        if(!validator.validate(email))
            return res.status(400).json({success: false, message:'Email không đúng định dạng'})     
        
        try {
            const user = await User.findOne({username}) // username : username

            if(user)
                return res.status(400).json({success: false, message: 'Tên đăng nhập đã tồn tại'})
            
            const hashpassword = await argon2.hash(password)
            const newUser = new User({username, password : hashpassword, email, fullname })
            await newUser.save()

            const accesstoken = jwt.sign({userId: newUser._id}, process.env.ACCESS_TOKEN)
            res.json({success: true, message: "Đăng ký thành công", accesstoken, newUser})
        } catch (error) {
            console.log(error.message)
            res.status(500).json({success: false, message: "Internal Server Error"})
        }
    }
)

//@router POST api/auth/login
//@access public
//@desc Login User
router.post(
    '/login',
    async (req, res) =>{
        const {username, password} = req.body
        // check rỗng
        if(!username || !password )
            return res.status(400).json({success: false, message:'Vui lòng điền đầy đủ các trường dữ liệu'})        
        
        try {
            const user = await User.findOne({username}) // username : username
            // check username có tồn tại không
            if(!user)
                return res.status(400).json({success: false, message: 'Tên đăng nhập hoặc mật khẩu không chính xác'})
   
            // passsword dung khong
            const checkpassword = await argon2.verify(user.password, password)
            if(!checkpassword)
                return res.status(400).json({success: false, message: 'Tên đăng nhập hoặc mật khẩu không chính xác'})
            
            const accesstoken = jwt.sign({userId: user._id}, process.env.ACCESS_TOKEN)
            res.json({success: true, message: "Đăng nhập thành công", accesstoken})

        } catch (error) {
            console.log(error.message)
            res.status(500).json({success: false, message: "Internal Server Error"})
        }
    }
)


router.put(
    '/bank/add',  verifyToken,
    async (req, res) =>{
        const {bank, name_bank, stk_bank, chi_nhanh} = req.body
        // check rỗng
        if(!bank || !name_bank || !stk_bank)
            return res.status(400).json({success: false, message:'Vui lòng điền đầy đủ các trường dữ liệu'})        
        
        try {

            const user = await User.findOne({ _id: req.userId });
            console.log(user.banks.length);
            if(user.banks.length  < 3){
                await User.findOneAndUpdate({_id: req.userId}, {
                    $push: {
                        banks: {bank, name_bank, stk_bank, chi_nhanh}
                    },
                  }).exec()
                
                  return res.status(200).json({success: true, message:'Thêm thành công'})
                
            }else{
                  return res.status(400).json({success: false, message:'Bạn chỉ được phép thêm tối đa 3 ngân hàng'})           
            }
           
        } catch (error) {
            console.log(error.message)
            res.status(500).json({success: false, message: "Internal Server Error"})
        }
    }
)


router.delete(
    '/bank/:id',  verifyToken,
    async (req, res) =>{
        try {
            const user = await User.findOne({ _id: req.userId });
            // const banks = await User.findOne({ _id: req.userId });
            console.log(user.banks.length);
            if(user.banks.length  > 0){
                // await user.banks.map(async Item => {
                //     if (Item._id == req.params.id){
                //         Item.banks.pull(req.params.id);
                //         Item.save();
                //     }
                       
                // })
                
                await User.findOneAndUpdate({_id: req.userId}, 
                    { $pull: {
                        banks: {
                          _id: req.params.id
                        }
                      }
                    }
                  ).exec()
            
                  return res.status(200).json({success: true, message:'Xoá thành công'})
                
            }else{
                  return res.status(400).json({success: false, message:'Có gì đâu mà xoá ?? :) '})           
            }
           
        } catch (error) {
            console.log(error.message)
            res.status(500).json({success: false, message: "Internal Server Error"})
        }
    }
)




//@router PUT api/auth/edit-profile/:id
//@access public
//@desc Edit User
router.put(
    '/change-pass/:id', verifyToken,
    async (req, res) =>{
        const {password, new_password, new_repassword} = req.body
        // check rỗng
        if(!new_password || !password || !new_repassword)
            return res.status(400).json({success: false, message:'Vui lòng điền đầy đủ các trường dữ liệu'})   
        
        if(new_password != new_repassword)
            return res.status(400).json({success: false, message:'Mật khẩu mới không giống nhau'})  

        try {
            const data = await User.findOne({ _id: req.userId });
            // username có tồn tại
            const checkpassword = await argon2.verify(data.password, password)
            if(!checkpassword)
                return res.status(400).json({success: false, message: 'mật khẩu cũ không chính xác'})
            
                const hashpassword = await argon2.hash(new_password)

                let Changepass = {
                    password : hashpassword
                }
        
                const updateCondition = {_id: req.userId}
        
                UpdatePass = await User.findOneAndUpdate(updateCondition, Changepass, {new: true})
        
                // User not authorised to update post or post not found
                if (!UpdatePass)
                return res.status(401).json({
                    success: false,
                    message: 'Đổi mật khẩu thất bại'
                })
        
                res.json({
                    success: true,
                    message: 'Đổi mật khẩu thành công'
                })
               

        } catch (error) {
            console.log(error.message)
            res.status(500).json({success: false, message: "Internal Server Error"})
        }
    }
)

router.put(
    '/:id', verifyToken,
    async (req, res) =>{
        
        const {balance, email, fullname, verified} = req.body
        // check rỗng
        try {
            const user = await User.findById({_id: req.params.id}).select('-password -banks')
            const Is_admin = await User.findById({_id: req.userId}).select('-password -banks')
            // if(Is_admin.role !='ADMIN' || req.params.id != req.userId) return res.status(403).json({success: false, message: "Access denied"})
            let info
            if(Is_admin.role == "ADMIN"){
                info = {
                    balance : balance ? balance : user.balance, 
                    email: email ? email : user.email,
                    fullname: fullname ? fullname : user.fullname,
                    verified : verified ?  verified : user.verified
                }
            }else if(req.params.id == req.userId){
                info = {
                    email: email ? email : user.email,
                    fullname: fullname ? fullname : user.fullname,
                }
            }else{
                return res.status(403).json({success: false, message: "Access denied"})
            }
                const updateCondition = {_id: req.params.id}
        
                UpdateInfo = await User.findOneAndUpdate(updateCondition, info, {new: true})
        
                // User not authorised to update post or post not found
                if (!UpdateInfo)
                return res.status(401).json({
                    success: false,
                    message: 'Cập nhật thông tin thất bại'
                })
        
                res.json({
                    success: true,
                    message: 'Cập nhật thông tin thành công',
                    user: UpdateInfo
                })
               

        } catch (error) {
            console.log(error.message)
            res.status(500).json({success: false, message: "Internal Server Error"})
        }
    }
)

router.post('/withdraw', verifyToken, async (req, res) =>{
    const {action, value, bankId} = req.body
    if(!action || !value || !bankId)
            return res.status(400).json({success: false, message:'Vui lòng điền đầy đủ các trường dữ liệu'})   
    try {
        const user = await User.findById(req.userId).select('-password')
        const conLai = user.balance-value
        if(conLai < 0 || value < 0) return res.status(400).json({success: false, message: "Số tiền vượt mức"})
        await User.findOneAndUpdate({_id: req.userId}, {balance: conLai}, {new: true}).exec()
        let bankInfo
        user.banks.map(row =>{
            if(row._id == bankId) bankInfo = row
        })
        let arr = {
            duyet: 0
        }
        let Ndata = JSON.parse(JSON.stringify(bankInfo));
        Ndata.duyet = "0"

        const withdraw = new _Logs({userFrom : user._id, _action: "withdraw", _value : value, _payload: Ndata })
            await withdraw.save()

        res.json({success: true, message: "Rút tiền thành công"})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({success: false, message: "Internal Server Error"})
    }

})


router.get('/logs', verifyToken, async (req, res) =>{
    try {
        const logs = await _Logs.find({userFrom: req.userId})
        res.json({success: true, logs})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({success: false, message: "Internal Server Error"})
    }

})

// route GET api/auth
// @desc check user login
// @access public 

router.get('/', verifyToken, async (req, res) =>{
    try {
        const user = await User.findById(req.userId).select('-password')
        if(!user) return res.status(400).json({success: false, message: "Nguoi dung khong ton tai"})

        res.json({success: true, user})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({success: false, message: "Internal Server Error"})
    }

})

// route GET api/auth
// @desc check user login
// @access public 

router.get('/check-admin', verifyToken, async (req, res) =>{
    try {
        const user = await User.findById(req.userId).select('role')
        if(!user || user.role !='ADMIN') return res.status(403).json({success: false, message: "Access denied"})

        res.json({success: true, user})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({success: false, message: "Internal Server Error"})
    }

})



router.get('/thongtin', verifyToken, async (req, res) =>{
    try {
        const user = await User.findById(req.userId).select('-password -banks')
        const Product = await _Product.find({userId: req.userId})
        const Checkout = await _Checkout.find({userId: req.userId})
        const SCheckout = await _Checkout.find({"product.userId": req.userId }).populate(
            'userId', 
            ['username', 'fullname']
        )
        const Post = await _Post.find({userId: req.userId})
        if(!user) return res.status(400).json({success: false, message: "Nguoi dung khong ton tai"})

        res.json({success: true, user, Product, Checkout, Post, SCheckout})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({success: false, message: "Internal Server Error"})
    }

})


router.get('/list', verifyToken, async (req, res) =>{
    try {
        const user = await User.findById({_id: req.userId}).select('-password -banks')
        if(user.role !='ADMIN' || !user) return res.status(403).json({success: false, message: "Access denied"})
        const users = await User.find({ role: {$ne: "ADMIN"}}).select('-password')
      
        res.json({success: true, users})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({success: false, message: "Internal Server Error"})
    }

})

router.get('/:id', async (req, res) =>{
    try {
        const user = await User.findById({_id: req.params.id}).select('-password -banks')
        if(!user) return res.status(400).json({success: false, message: "Nguoi dung khong ton tai"})

        res.json({success: true, user})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({success: false, message: "Internal Server Error"})
    }

})

router.delete('/:id', verifyToken, async (req, res) => {
	try {
        const user = await User.findById({_id: req.userId}).select('role')
        if(user.role !='ADMIN' || !user) return res.status(403).json({success: false, message: "Access denied"})

		const DeleteCondition = { _id: req.params.id }
		const deletedUser = await User.findOneAndDelete(DeleteCondition)

		// User not authorised or post not found
		if (!deletedUser)
			return res.status(401).json({
				success: false,
				message: 'User not found or user not authorised'
			})

		res.json({ success: true, user: deletedUser })
	} catch (error) {
		console.log(error)
		res.status(500).json({ success: false, message: 'Internal server error' })
	}
})



module.exports = router