const express = require('express')
const router = express.Router()
const verifyToken = require('../middleware/Auth')
const mongoose = require('mongoose')
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
let path = require('path');

const Post = require('../models/Post')
const paginate = require('jw-paginate');
const _User = require('../models/User')



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


router.get('/admin/all', verifyToken,async(req, res) =>{
    try {
        const _isAdmin = await _User.findById(req.userId).select('role')
        if(_isAdmin.role !='ADMIN' || !_isAdmin) return res.status(403).json({success: false, message: "Access denied"})

        const posts = await Post.find().populate('userId', ['username']).sort({createdAt: 'desc'})
        // lấy trang từ tham số truy vấn hoặc mặc định đến trang đầu tiên
        const page = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || posts.length
        // lấy đối tượng trang cho trang cụ thể
        const pageSize = limit;
        const pager = paginate(posts.length, page, pageSize);
    
        // lấy trang của các mục từ mảng các mục
        const pageOfItems = posts.slice(pager.startIndex, pager.endIndex + 1);
     
        res.json({success: true, posts, pager, pageOfItems})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({success: false, message: "Internal Server Error"})
    }
})

//  @router GET api/post/all
// @desc Get All Post 
// access public

router.get('/all', async(req, res) =>{
    try {
        const posts = await Post.find({status: "OK"}).populate('userId', ['username']).sort({createdAt: 'desc'})
        // lấy trang từ tham số truy vấn hoặc mặc định đến trang đầu tiên
        const page = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || posts.length
        // lấy đối tượng trang cho trang cụ thể
        const pageSize = limit;
        const pager = paginate(posts.length, page, pageSize);
    
        // lấy trang của các mục từ mảng các mục
        const pageOfItems = posts.slice(pager.startIndex, pager.endIndex + 1);
       
        res.json({success: true, posts, pager, pageOfItems})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({success: false, message: "Internal Server Error"})
    }
})

//  @router GET api/post/all
// @desc Get All Post 
// access public

router.get('/:id', async(req, res) =>{
    try {
        if(mongoose.Types.ObjectId.isValid(req.params.id)){
            const post = await Post.findById({_id: req.params.id}).populate('userId', ['username'])
            res.json({success: true, post})
        }else{
            return res.status(400).json({success: false, message: 'Bài viết không tồn tại'})
        }
       
    } catch (error) {
        console.log(error.message)
        res.status(500).json({success: false, message: "Internal Server Error"})
    }
})

router.get('/test/test', (req, res, next) => {
    // example array of 150 items to be paged
    const items = [...Array(150).keys()].map(i => ({ id: (i + 1), name: 'Item ' + (i + 1) }));

    // lấy trang từ tham số truy vấn hoặc mặc định đến trang đầu tiên
    const page = parseInt(req.query.page) || 1;

    // lấy đối tượng trang cho trang cụ thể
    const pageSize = 2;
    const pager = paginate(items.length, page, pageSize);

    // lấy trang của các mục từ mảng các mục
    const pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1);

    // trả về đối tượng máy nhắn tin và trang hiện tại của các mục
    return res.json({ pager, pageOfItems });
});

//  @router GET api/post
// @desc Get All Post 
// access Private

router.get('/', verifyToken,async(req, res) =>{
    try {
        const posts = await Post.find({userId: req.userId}).populate('userId', ['username']).sort({createdAt: 'desc'})
        // lấy trang từ tham số truy vấn hoặc mặc định đến trang đầu tiên
        const page = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || posts.length
        // lấy đối tượng trang cho trang cụ thể
        const pageSize = limit;
        const pager = paginate(posts.length, page, pageSize);
    
        // lấy trang của các mục từ mảng các mục
        const pageOfItems = posts.slice(pager.startIndex, pager.endIndex + 1);
     
        res.json({success: true, posts, pager, pageOfItems})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({success: false, message: "Internal Server Error"})
    }
})

// @route POST api/post
// Create Post
// access Private

router.post('/', upload.single('thumbnail'), verifyToken, async (req, res)=>{
    const{title, description,tags, file} = req.body
    let thumbnail
    // if(!file){
    //     thumbnail = ""
    // }else{
        thumbnail = req.file.filename;
    // }
    // check rỗng
    if(!title || !description)
        return res.status(400).json({success: false, message:'Vui lòng điền đầy đủ các trường dữ liệu'})
    
    try {
        const _title = await Post.findOne({title})
        if(_title)
            return res.status(400).json({success: false, message: 'Tên bài viết đã tồn tại'})

        const newPost = new Post({title, description, thumbnail, tags : tags.split(",") || ["none"], userId: req.userId })
        await newPost.save()
        res.json({success: true, message: "Dang thanh cong"})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({success: false, message: "Internal Server Error"})
    }


})

// @route PUT api/post
// Update Post
// access Private
router.put('/:id', verifyToken, async(req, res)=>{
    const{title, description, tags, status} = req.body

    // check rỗng
    if(!title || !description)
        return res.status(400).json({success: false, message:'Vui lòng điền đầy đủ các trường dữ liệu'})
    
    try {
        const _isAdmin = await _User.findById(req.userId).select('role')
        const _Owner = await Post.findById({_id: req.params.id })
        if(_Owner.userId != req.userId || _isAdmin.role !='ADMIN') return res.status(403).json({success: false, message: "Access denied"})
        let UpdatePost
        if(_isAdmin.role =='ADMIN'){
            UpdatePost = {
                title,
                description,
                tags : tags || ["none"],
                status
            }
        }else{
            UpdatePost = {
                title,
                description,
                tags : tags || ["none"]
            }
        }
        

        const updateCondition = {_id: req.params.id, userId: req.userId}

        UpdatePost = await Post.findOneAndUpdate(updateCondition, UpdatePost, {new: true}).populate('userId', ['username'])

        // User not authorised to update post or post not found
		if (!UpdatePost)
        return res.status(401).json({
            success: false,
            message: 'Post not found or user not authorised'
        })

        res.json({
            success: true,
            message: 'Excellent progress!',
            post: UpdatePost
        })

    } catch (error) {
        console.log(error.message)
        res.status(500).json({success: false, message: "Internal Server Error"})
    }
})

// @route DELETE api/posts
// @desc Delete post
// @access Private
router.delete('/:id', verifyToken, async (req, res) => {
	try {
		const postDeleteCondition = { _id: req.params.id, userId: req.userId }
		const deletedPost = await Post.findOneAndDelete(postDeleteCondition)

		// User not authorised or post not found
		if (!deletedPost)
			return res.status(401).json({
				success: false,
				message: 'Post not found or user not authorised'
			})

		res.json({ success: true, post: deletedPost })
	} catch (error) {
		console.log(error)
		res.status(500).json({ success: false, message: 'Internal server error' })
	}
})

module.exports = router