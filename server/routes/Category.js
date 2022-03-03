const express = require('express')
const router = express.Router()
const verifyToken = require('../middleware/Auth')


const _Category = require('../models/Category')
const User = require('../models/User')


// @route Category api/Category
// Create Category
// access Private

router.post('/', verifyToken, async (req, res)=>{
    const{cname, description,type_product} = req.body

    // check rỗng
    if(!cname || !description || !type_product)
        return res.status(400).json({success: false, message:'Vui lòng điền đầy đủ các trường dữ liệu'})
     
    try {
        const _isAdmin = await User.findById(req.userId).select('role')
        if(_isAdmin.role !='ADMIN' || !_isAdmin) return res.status(403).json({success: false, message: "Access denied"})

        const _name = await _Category.findOne({cname})
        if(_name)
            return res.status(400).json({success: false, message: 'Tên chuyên mục đã tồn tại'})

        const newCategory = new _Category({cname, description, type_product })
        await newCategory.save()
        res.json({success: true, message: "Thêm chuyên mục thành công", newCategory})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({success: false, message: "Internal Server Error"})
    }


})

// @route Category api/Category/:id
// EDIT Category
// access Private

router.put('/:id', verifyToken, async (req, res)=>{
    const{cname, description,type_product, status} = req.body
    // const _id = req.params.id
    // check rỗng
    if(!cname || !description || !type_product || !status)
        return res.status(400).json({success: false, message:'Vui lòng điền đầy đủ các trường dữ liệu'})
     
    try {
        let UpdateCategory = {
            cname,
            description,
            type_product,
            status
        }
        const _isAdmin = await User.findById(req.userId).select('role')
        if(_isAdmin.role !='ADMIN' || !_isAdmin) return res.status(403).json({success: false, message: "Access denied"})

        const updateCondition = {_id: req.params.id}
        Update = await _Category.findOneAndUpdate(updateCondition, UpdateCategory, {new: true})

        if (!Update)
        return res.status(401).json({
            success: false,
            message: 'Category not found or user not authorised'
        })

        res.json({
            success: true,
            message: 'Cập nhật thành công',
            category: Update
        })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({success: false, message: "Internal Server Error"})
    }


})


// @route DELETE api/categories
// @desc Delete categories
// @access Private
router.delete('/:id', verifyToken, async (req, res) => {

	try {
        const _isAdmin = await User.findById(req.userId).select('role')
        if(_isAdmin.role !='ADMIN' || !_isAdmin) return res.status(403).json({success: false, message: "Access denied"})

		const postDeleteCondition = { _id: req.params.id}
		const deleted = await _Category.findOneAndDelete(postDeleteCondition)

		// User not authorised or post not found
		if (!deleted)
			return res.status(401).json({
				success: false,
				message: 'Category not found or user not authorised'
			})

		res.json({ success: true, category: deleted })
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
        const categories = await _Category.find({status: "ON"})
        res.json({success: true, categories})
	} catch (error) {
		console.log(error)
		res.status(500).json({ success: false, message: 'Internal server error' })
	}
})

// @route GET api/categories
// @desc GET ALL categories
// @access PUBLIC
router.get('/type/:type', async (req, res) => {

	try {
        const categories = await _Category.find({status: "ON", type_product: req.params.type})
        res.json({success: true, categories})
	} catch (error) {
		console.log(error)
		res.status(500).json({ success: false, message: 'Internal server error' })
	}
})

// @route GET api/categories
// @desc GET ALL categories
// @access PRIVATE
router.get('/list', verifyToken, async (req, res) => {

	try {
        const _isAdmin = await User.findById(req.userId).select('role')
        if(_isAdmin.role !='ADMIN' || !_isAdmin) return res.status(403).json({success: false, message: "Access denied"})

        const category = await _Category.find()
        res.json({success: true, category})
	} catch (error) {
		console.log(error)
		res.status(500).json({ success: false, message: 'Internal server error' })
	}
})


// @route GET api/categories
// @desc GET 1 categories
// @access PRIVATE
router.get('/:id', verifyToken, async (req, res) => {

	try {
        // const _isAdmin = await User.findById(req.userId).select('role')
        // if(_isAdmin.role !='ADMIN' || !_isAdmin) return res.status(403).json({success: false, message: "Access denied"})

		const findOneC = { _id: req.params.id}
		const GetOne = await _Category.findOne(findOneC)

		// User not authorised or post not found
		if (!GetOne)
			return res.status(401).json({
				success: false,
				message: 'Category not found or user not authorised'
			})

		res.json({ success: true, category: GetOne })


	} catch (error) {
		console.log(error)
		res.status(500).json({ success: false, message: 'Internal server error' })
	}
})

module.exports = router