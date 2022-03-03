const express = require('express')
const router = express.Router()

const argon2 = require('argon2')
const jwt = require('jsonwebtoken')

const _Cart = require('../models/Cart')
const _Product = require('../models/Product')
const _User = require('../models/User')
const _Category = require('../models/Category')

const verifyToken = require('../middleware/Auth')



router.get('/list', verifyToken, async (req, res) => {
	try {
        //.populate('product', ['title', 'price', 'discount', 'type_product', 'category', 'tags'])
        const _Cdata = await _Cart.findOne(
            {userId: req.userId }
            ).populate(
                'userId', 
                ['username', 'fullname']
            ).populate({
              path : 'product',
            select: ['title', 'price', 'discount', 'type_product', 'category', 'tags'],
            populate : {
              path : 'category',
              select: ['cname']
            }
            })
        res.json({success: true, message: "Lấy danh sách giỏ hàng thành công", cart: _Cdata})
	} catch (error) {
		console.log(error)
		res.status(500).json({ success: false, message: 'Internal server error' })
	}
})
/* 

.populate({
            path : 'product',
            select: ['title', 'price', 'discount', 'type_product', 'category', 'tags'],
            populate : {
              path : 'category',
              select: ['cname']
            }
          })
*/
// Add product to Cart

router.get('/:id', verifyToken, async (req, res) => {
	try {
        const _Pdata = await _Product.findById({_id: req.params.id}).select('id')
        const _CData = await _Cart.findOne({userId: req.userId})
        if(!_CData){
          const AddToCart = new _Cart({product: [_Pdata], userId: req.userId})
          await AddToCart.save()
          res.status(200).json({ success: true, message: "Sản phẩm được thêm vào giỏ hàng thành công" , AddToCart })

        }else{
          let SPtrung = 0
             _CData.product.map(Item => {
                if (Item._id == req.params.id) SPtrung +=1
            })
            if(SPtrung > 0)  return res.status(400).json({ success: false, message: "Sản phẩm đã ở trong giỏ hàng" });
           
            const AddToCart = await _Cart.findOneAndUpdate({_id: _CData._id}, {
              $push: {
                  product: _Pdata
              },
            });
          
          if(!AddToCart){
              return res.status(400).json({success: false, message: 'Sản phẩm không hợp lệ'})
          }

          return res.status(200).json({ success: true, message: "Sản phẩm được thêm vào giỏ hàng thành công" , AddToCart })
       
        }
     	} catch (error) {
		console.log(error)
		res.status(500).json({ success: false, message: 'Internal server error' })
	}
})

// xoa all
//   const postDeleteCondition = { _id: req.params.id, userId: req.userId }
// const deletedPost = await Post.findOneAndDelete(postDeleteCondition)


router.delete('/all', verifyToken, async (req, res) => {
	try {
        const _Cdata = await _Cart.findOne({userId: req.userId}).remove()
        // User not authorised or post not found
        if (!_Cdata)
          return res.status(401).json({
            success: false,
            message: 'xoá thất bại'
          })

		res.json({ success: true, message: "Xoá thành công tất cả sản phẩm ra khỏi giỏ hàng" })
      
	} catch (error) {
		console.log(error)
		res.status(500).json({ success: false, message: 'Internal server error' })
	}
})
//const filteredList = list.filter((element) => element._id !== targetObj._id);
router.delete('/:id', verifyToken, async (req, res) => {
	try {
    const _Pdata = await _Product.findById({_id: req.params.id}).select('id')
        const _CData = await _Cart.findOne({userId: req.userId})
        if(!_CData){
          res.status(400).json({ success: false, message: "Sản phẩm không ở trong giỏ hàng " })

        }else{
          let SPtrung = 0
             _CData.product.map(Item => {
                if (Item._id == req.params.id) SPtrung +=1
            })
            if(SPtrung == 0)  return res.status(400).json({ success: false, message: "Sản phẩm không ở trong giỏ hàng" });
           
            const RemoveFromCart = await _Cart.findOneAndUpdate({_id: _CData._id}, {
              $pullAll: {
                  product: [_Pdata]
              },
            });
          
          if(!RemoveFromCart){
              return res.status(400).json({success: false, message: 'Xoá không thành công'})
          }

          return res.status(200).json({ success: true, message: "Xoá thành công sản phẩm ra khỏi giỏ hàng" })
        }
    //     const _Pdata = await _Product.findById({_id: req.params.id})
    //     const _Cdata = await _Cart.find({product: req.params.id, userId: req.userId})
    //     if(!_Pdata) return res.status(400).json({success: false, message: 'Sản phẩm không hợp lệ '})
    //     if(_Cdata.length == 0)  return res.status(400).json({success: false, message: 'Sản phẩm không ở trong giỏ hàng '})
    //     const DeleteCondition = { product: req.params.id, userId: req.userId }
		//     const deletedCart = await _Cart.findOneAndDelete(DeleteCondition)

    //     // User not authorised or post not found
    //     if (!deletedCart)
    //       return res.status(401).json({
    //         success: false,
    //         message: 'Product not found or user not authorised'
    //       })

		// res.json({ success: true, message: "Xoá thành công sản phẩm ra khỏi giỏ hàng" })
      
	} catch (error) {
		console.log(error)
		res.status(500).json({ success: false, message: 'Internal server error' })
	}
})




module.exports = router