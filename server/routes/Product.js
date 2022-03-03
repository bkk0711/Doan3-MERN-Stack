const express = require('express')
const router = express.Router()
const verifyToken = require('../middleware/Auth')
const mongoose = require('mongoose')
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
let path = require('path');

const _Product = require('../models/Product')
const _User = require('../models/User')
const _Category = require('../models/Category')
const paginate = require('jw-paginate');


const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/uploads/products');
        // cb(null, '../../client/public/upload/');
        // cb(null, path.join(__dirname, '/uploads/'));

    },
    filename: function(req, file, cb) {   
        cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if(allowedFileTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

let upload = multer({ storage, fileFilter });


// @route Product api/Product
// Create Product
// access Private

router.post('/', upload.single('thumbnail'), verifyToken, async (req, res)=>{

    const{title, description,type_product, category, price, discount, urlfile, urldemo, tags, file} = req.body
    let thumbnail
    // if(!file){
    //     thumbnail = ""
    // }else{
        thumbnail = req.file.filename;
    // }
 

    // check rỗng
    if(!title || !description || !type_product || !category || !urlfile)
        return res.status(400).json({success: false, message:'Vui lòng điền đầy đủ các trường dữ liệu'})
    
    try {
        const _Cdata = await _Category.findById({_id: category})
        if(_Cdata.type_product != type_product || _Cdata.status === "OFF") return res.status(400).json({success: false, message: 'Chuyên mục không hợp lệ'})
        if(price < 0 || discount < 0) return res.status(400).json({success: false, message: 'Giá không hợp lệ '})

        const newProduct = new _Product({
            title, 
            description, 
            type_product,
            category,
            price,
            discount,
            urlfile,
            urldemo,
            tags : tags.split(",") || ["none"], 
            thumbnail,
            userId: req.userId 
        })
        await newProduct.save()
        res.json({success: true, message: "Đăng sản phẩm thành công, vui lòng đợi duyệt", newProduct})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({success: false, message: "Internal Server Error"})
    }

})
// @route Category api/Product/:id
// Update status Product
// access Admin MOD

router.put('/status_change/:id', verifyToken, async (req, res)=>{
    const{status} = req.body
    // const _id = req.params.id
    // check rỗng
    if(!status)
        return res.status(400).json({success: false, message:'Vui lòng điền đầy đủ các trường dữ liệu'})
     
    try {
        const _Pdata = await _Product.findById({_id: req.params.id})
        const _isAdmin = await _User.findById(req.userId).select('role')
        if(_isAdmin.role =='ADMIN' || _isAdmin.role =='MOD'){
            let UpdateProduct = {
                status
            }
            const updateCondition = {_id: req.params.id}
            Update = await _Product.findOneAndUpdate(updateCondition, UpdateProduct, {new: true})
            if (!Update)
            return res.status(401).json({
                success: false,
                message: 'Product not found or user not authorised'
            })

            res.json({
                success: true,
                message: 'Cập nhật thành công',
                product: Update
            })
        }else return res.status(403).json({success: false, message: "Access denied"})

    } catch (error) {
        console.log(error.message)
        res.status(500).json({success: false, message: "Internal Server Error"})
    }
})


// @route Category api/Product/:id
// EDIT Product
// access Private

router.put('/:id', verifyToken, async (req, res)=>{
    const{title, description, type_product, category, price, discount, urlfile, urldemo, tags, status} = req.body
    // const _id = req.params.id
    // check rỗng
    if(!title || !description || !type_product || !category || !urlfile)
        return res.status(400).json({success: false, message:'Vui lòng điền đầy đủ các trường dữ liệu'})
     
    try {
        const _Pdata = await _Product.findById({_id: req.params.id})
        const _isAdmin = await _User.findById(req.userId).select('role')
        if(_Pdata.userId.toString()  == req.userId || _isAdmin.role =='ADMIN'){
            let UpdateProduct

            if(_isAdmin.role =='ADMIN'){
                UpdateProduct = {
                    title, 
                    description, 
                    type_product, 
                    category, 
                    price, 
                    discount, 
                    urlfile,
                    urldemo,
                    tags : tags || ["none"],
                    status
                }
            }else{
                UpdateProduct = {
                    title, 
                    description, 
                    type_product, 
                    category, 
                    price, 
                    discount, 
                    urlfile,
                    urldemo,
                    tags : tags || ["none"]
                }
            }
           
            const updateCondition = {_id: req.params.id}
            Update = await _Product.findOneAndUpdate(updateCondition, UpdateProduct, {new: true}).populate('userId', ['username', 'fullname']).populate('category', ['cname'])
            if (!Update)
            return res.status(401).json({
                success: false,
                message: 'Product not found or user not authorised'
            })

            res.json({
                success: true,
                message: 'Cập nhật thành công',
                product: Update
            })
        }else return res.status(403).json({success: false, message: "Access denied"})

    } catch (error) {
        console.log(error.message)
        res.status(500).json({success: false, message: "Internal Server Error"})
    }
})




// @route DELETE api/product
// @desc Delete product
// @access Private
router.delete('/:id', verifyToken, async (req, res) => {

	try {
        const _Pdata = await _Product.findById({_id: req.params.id})
        const _isAdmin = await _User.findById(req.userId).select('role')
        if(_Pdata.userId.toString()  == req.userId || _isAdmin.role =='ADMIN'){
        const postDeleteCondition = { _id: req.params.id}
		const deleted = await _Product.findOneAndDelete(postDeleteCondition)

		// User not authorised or post not found
		if (!deleted)
			return res.status(401).json({
				success: false,
				message: 'Product not found or user not authorised'
			})

		res.json({ success: true, product: deleted })

  
        }else return res.status(403).json({success: false, message: "Access denied"})

	
	} catch (error) {
		console.log(error)
		res.status(500).json({ success: false, message: 'Internal server error' })
	}
})


// @route GET api/categories
// @desc GET ALL categories
// @access PUBLIC
router.get('/', async (req, res) => {

	try {
        const products = await _Product.find({status: "OK"}).select("-urlfile").sort({createdAt: 'desc'})
        const page = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || products.length
        // lấy đối tượng trang cho trang cụ thể
        const pageSize = limit;
        const pager = paginate(products.length, page, pageSize);
    
        // lấy trang của các mục từ mảng các mục
        const pageOfItems = products.slice(pager.startIndex, pager.endIndex + 1)

        if(products.length > 0) return res.json({success: true, products, pager, pageOfItems})
        else return res.status(400).json({success: false, message: "Không có sản phẩm"})
	} catch (error) {
		console.log(error)
		res.status(500).json({ success: false, message: 'Internal server error' })
	}
})

// @route GET api/categories
// @desc GET ALL categories
// @access PUBLIC
router.get('/all', verifyToken, async (req, res) => {

	try {
        const _isAdmin = await _User.findById(req.userId).select('role')
        if(_isAdmin.role !='ADMIN' || !_isAdmin) return res.status(403).json({success: false, message: "Access denied"})
        const products = await _Product.find().select("-urlfile").sort({createdAt: 'desc'}).populate('userId', ['username', 'fullname']).populate('category', ['cname'])
        const page = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || products.length
        // lấy đối tượng trang cho trang cụ thể
        const pageSize = limit;
        const pager = paginate(products.length, page, pageSize);
    
        // lấy trang của các mục từ mảng các mục
        const pageOfItems = products.slice(pager.startIndex, pager.endIndex + 1)

        if(products.length > 0) return res.json({success: true, products, pager, pageOfItems})
        else return res.status(400).json({success: false, message: "Không có sản phẩm"})
	} catch (error) {
		console.log(error)
		res.status(500).json({ success: false, message: 'Internal server error' })
	}
})

// @route GET api/categories
// @desc GET ALL categories
// @access PUBLIC
router.get('/list', verifyToken, async (req, res) => {

	try {

        const products = await _Product.find({userId: req.userId}).sort({createdAt: 'desc'}).populate('category', ['cname'])
        const page = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || products.length
        // lấy đối tượng trang cho trang cụ thể
        const pageSize = limit;
        const pager = paginate(products.length, page, pageSize);
    
        // lấy trang của các mục từ mảng các mục
        const pageOfItems = products.slice(pager.startIndex, pager.endIndex + 1)
        res.json({success: true, products, pager, pageOfItems})

	} catch (error) {
		console.log(error)
		res.status(500).json({ success: false, message: 'Internal server error' })
	}
})


// @route GET api/categories
// @desc GET 1 categories
// @access PRIVATE
router.get('/:id', async (req, res) => {

	try {
        // const _isAdmin = await User.findById(req.userId).select('role')
        // if(_isAdmin.role !='ADMIN' || !_isAdmin) return res.status(403).json({success: false, message: "Access denied"})
        if(req.params.id == "undefined") return res.json({ success: true})
		const findOneC = { _id: req.params.id}
		const product = await _Product.findOne(findOneC).populate('userId', ['username', 'fullname']).populate('category', ['cname']).select("-urlfile")

		// User not authorised or post not found
		if (!product || product.status == "WAITING")
			return res.status(401).json({
				success: false,
				message: 'Product not found or user not authorised'
			})

		res.json({ success: true, product })


	} catch (error) {
		console.log(error)
		res.status(500).json({ success: false, message: 'Internal server error' })
	}
})

router.get('/admin/view/:id', verifyToken, async (req, res) => {

	try {
        const _isAdmin = await _User.findById(req.userId).select('role')
        if(_isAdmin.role !='ADMIN' || !_isAdmin) return res.status(403).json({success: false, message: "Access denied"})
        if(req.params.id == "undefined") return res.json({ success: true})
		const findOneC = { _id: req.params.id}
		const product = await _Product.findOne(findOneC).populate('userId', ['username', 'fullname']).populate('category', ['cname'])

		res.json({ success: true, product })


	} catch (error) {
		console.log(error)
		res.status(500).json({ success: false, message: 'Internal server error' })
	}
})





module.exports = router