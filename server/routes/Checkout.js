const express = require('express')
const router = express.Router()

const argon2 = require('argon2')
const jwt = require('jsonwebtoken')

const _Cart = require('../models/Cart')
const _Product = require('../models/Product')
const _User = require('../models/User')
const _Category = require('../models/Category')
const _Checkout = require('../models/Checkout')

const verifyToken = require('../middleware/Auth')

router.get('/', verifyToken, async (req, res) => {
	try {
        // lấy ds data giỏ hàng
        const _Cdata = await _Cart.findOne(
            {userId: req.userId }
            ).populate(
                'userId', 
                ['username', 'fullname']
            ).populate({
              path : 'product',
            select: ['title', 'price', 'discount', 'urlfile', 'tags', 'type_product', 'category', 'tags', 'userId'],
            populate : {
              path : 'category',
              select: ['cname']
            }
            })
            // nếu giỏ hàng rỗng
        if(!_Cdata) return res.status(400).json({success: false, message: 'Không có sản phẩm nào trong giỏ hàng'})
        //  lấy ds sản phẩm trong giỏ hàng
        const _Pdata = _Cdata.product
        // copy data
        let Ndata = JSON.parse(JSON.stringify(_Pdata));
        //data người mua
        const _Udata = await _User.findById(req.userId).select('balance')
        let totalPrice = 0
        _Pdata.map(row => {
            totalPrice +=  row.discount ?  row.discount : row.price
        })
        const conLai = _Udata.balance - totalPrice
        if(conLai < 0 ) return res.status(400).json({success: false, message: 'Số dư không đủ để thanh toán giỏ hàng này', totalPrice})
        // trừ tiền
        await _User.findOneAndUpdate({_id: req.userId}, {balance: conLai}, {new: true}).exec()
        // Cộng tiền
      

      

       await Ndata.map(async row => {
            const _Sdata = await _User.findById(row.userId).select('balance')
            const congthem = _Sdata.balance + totalPrice
            await _User.findOneAndUpdate({_id: row.userId}, {balance: congthem}, {new: true}).exec()
            row.ngaymua =new Date().toISOString()
            const NewCheckout = new _Checkout({product: row, userId: req.userId})
            await NewCheckout.save()

        })
        
       
        await _Cart.findOne({userId: req.userId}).remove()
           
           res.status(200).json({ success: true, message: "Bạn đã thanh toán thành công giỏ hàng" })
         
        

	} catch (error) {
		console.log(error)
		res.status(500).json({ success: false, message: 'Internal server error' })
	}
})

router.get('/:id', verifyToken, async (req, res) => {
	try {
        // data sản phẩm
        const _Pdata = await _Product.findById({_id: req.params.id}).select('-status -pRatingsReviews -createdAt -updatedAt').populate('category', ['cname'])
        // data người bán
        const _Sdata = await _User.findById(_Pdata.userId).select('balance')
        // data người mua
        const _Udata = await _User.findById(req.userId).select('balance')
        // giá ban
        const totalPrice = _Pdata.discount &&  _Pdata.discount !=0 ?  _Pdata.discount : _Pdata.price
        // // checkout
        // const _COData = await _Checkout.findOne({userId: req.userId}) //{product: {_id: req.params.id} }
        // COpy Data Product & thêm value ngày mua
        let Ndata = JSON.parse(JSON.stringify(_Pdata));
        Ndata.ngaymua = new Date().toISOString()

        const conLai = _Udata.balance-totalPrice
        if(_Sdata != null){
             // Cộng tiền
            const congthem = _Sdata.balance + totalPrice
            await _User.findOneAndUpdate({_id: _Pdata.userId}, {balance: congthem}, {new: true}).exec()
        }
       

        if(conLai < 0 ) return res.status(400).json({success: false, message: 'Số dư không đủ để mua sản phẩm này', totalPrice})

        // trừ tiền
        await _User.findOneAndUpdate({_id: req.userId}, {balance: conLai}, {new: true}).exec()
       
        

        const NewCheckout = new _Checkout({product: Ndata, userId: req.userId})
        await NewCheckout.save()

        res.status(200).json({ success: true, message: "Bạn đã thanh toán thành công giỏ hàng" })
          
         
	} catch (error) {
		console.log(error)
		res.status(500).json({ success: false, message: 'Internal server error' })
	}
})
/*
router.get('/', verifyToken, async (req, res) => {
	try {
        const _Cdata = await _Cart.findOne(
            {userId: req.userId }
            ).populate(
                'userId', 
                ['username', 'fullname']
            ).populate({
              path : 'product',
            select: ['title', 'price', 'discount', 'urlfile', 'tags', 'type_product', 'category', 'tags', 'userId'],
            populate : {
              path : 'category',
              select: ['cname']
            }
            })
        if(!_Cdata) return res.status(400).json({success: false, message: 'Không có sản phẩm nào trong giỏ hàng'})
        const _Pdata = _Cdata.product
        let Ndata = JSON.parse(JSON.stringify(_Pdata));
        // console.log(Ndata)
        const _Udata = await _User.findById(req.userId).select('balance')
        let totalPrice = 0
        _Pdata.map(row => {
            totalPrice +=  row.discount ?  row.discount : row.price
        })
        const _COData = await _Checkout.findOne({userId: req.userId}) 
        //    console.log(totalPrice)
        const conLai = _Udata.balance-totalPrice
        if(!_COData){
            if(conLai < 0 ) return res.status(400).json({success: false, message: 'Số dư không đủ để mua sản phẩm này', totalPrice})
            const truTien = await _User.findOneAndUpdate({_id: req.userId}, {balance: conLai}, {new: true})
            if(!truTien)  return res.status(400).json({success: false, message: 'mua sản phẩm thất bại'})    
            Ndata.map(async row => {
                row.ngaymua =new Date().toISOString()
            })
            // console.log(Ndata)
            const NewCheckout = new _Checkout({product: Ndata, userId: req.userId})
            await NewCheckout.save()
            res.status(200).json({ success: true, message: "Bạn đã mua thành công" , NewCheckout })

        }else{
            if(conLai < 0 ) return res.status(400).json({success: false, message: 'Số dư không đủ để mua sản phẩm này', totalPrice})
            const truTien = await _User.findOneAndUpdate({_id: req.userId}, {balance: conLai}, {new: true})
            if(!truTien)  return res.status(400).json({success: false, message: 'mua sản phẩm thất bại'})
            
            Ndata.map(async row => {
                row.ngaymua = new Date().toISOString()
            //    console.log(row)
                await _Checkout.findOneAndUpdate({_id: _COData._id}, {
                    $push: {
                        product: row
                    },
                  }).exec()
            })

            // await _Cart.findOne({userId: req.userId}).remove()
           res.status(200).json({ success: true, message: "Bạn đã thanh toán thành công giỏ hàng" })
         
        }

	} catch (error) {
		console.log(error)
		res.status(500).json({ success: false, message: 'Internal server error' })
	}
})


router.get('/:id', verifyToken, async (req, res) => {
	try {
        const _Pdata = await _Product.findById({_id: req.params.id}).select('-status -pRatingsReviews -createdAt -updatedAt')
        const _Sdata = await _User.findById(_Pdata.userId).select('balance')
        console.log(_Sdata)
        const _Udata = await _User.findById(req.userId).select('balance')
        const totalPrice = _Pdata.discount &&  _Pdata.discount !=0 ?  _Pdata.discount : _Pdata.price
        const _COData = await _Checkout.findOne({userId: req.userId}) //{product: {_id: req.params.id} }
        const _CIData = await _Checkin.findOne({userId: _Pdata.userId})
        let Ndata = JSON.parse(JSON.stringify(_Pdata));
        Ndata.ngaymua = Date.now()
        const conLai = _Udata.balance-totalPrice
        const congthem = _Sdata.balance + totalPrice
          if(!_COData){
            if((_Udata.balance - totalPrice) < 0 ) return res.status(400).json({success: false, message: 'Số dư không đủ để mua sản phẩm này', totalPrice})
            const truTien = await _User.findOneAndUpdate({_id: req.userId}, {balance: conLai}, {new: true})
            if(!truTien)  return res.status(400).json({success: false, message: 'mua sản phẩm thất bại'})    
            const NewCheckout = new _Checkout({product: [Ndata], userId: req.userId})
            await NewCheckout.save()
            if(!_CIData){
                await _User.findOneAndUpdate({_id: _Pdata.userId}, {balance: congthem}, {new: true}).exec()
                const NewCheckin = new _Checkin({product: [Ndata], userId: _Pdata.userId})
                await NewCheckin.save()
            }else{
                await _User.findOneAndUpdate({_id: _Pdata.userId}, {balance: congthem}, {new: true}).exec()
                await _Checkout.findOneAndUpdate({_id: _CIData._id}, {
                    $push: {
                        product: Ndata
                    },
                  }).exec()
            }
            res.status(200).json({ success: true, message: "Bạn đã mua thành công sản phẩm này" , NewCheckout })
        }else{
            // console.log(_COData.product.length)
            // if(_COData.product.length)
            // let SPtrung = 0
            //  _COData.product.map(Item => {
            //     if (Item._id == req.params.id) SPtrung +=1
            // })
            // // if(SPtrung > 0)  return res.status(400).json({ success: false, message: "Bạn đã mua sản phẩm này rồi" });
            if((_Udata.balance - totalPrice) < 0 ) return res.status(400).json({success: false, message: 'Số dư không đủ để mua sản phẩm này', totalPrice})
            const truTien = await _User.findOneAndUpdate({_id: req.userId}, {balance: conLai}, {new: true})
            if(!truTien)  return res.status(400).json({success: false, message: 'mua sản phẩm thất bại'})
           
            const newCheckOutProduct = await _Checkout.findOneAndUpdate({_id: _COData._id}, {
                $push: {
                    product: Ndata
                },
              });
            
            if(!newCheckOutProduct){
                return res.status(400).json({success: false, message: 'mua sản phẩm thất bại'})
            }
            if(!_CIData){
                await _User.findOneAndUpdate({_id: _Pdata.userId}, {balance: congthem}, {new: true}).exec()
                const NewCheckin = new _Checkin({product: [Ndata], userId: _Pdata.userId})
                await NewCheckin.save()
            }else{
                await _User.findOneAndUpdate({_id: _Pdata.userId}, {balance: congthem}, {new: true}).exec()
                await _Checkout.findOneAndUpdate({_id: _CIData._id}, {
                    $push: {
                        product: Ndata
                    },
                  }).exec()
            }

           res.status(200).json({ success: true, message: "Bạn đã mua thành công sản phẩm này" , newCheckOutProduct })
         
           
            
        } 
	} catch (error) {
		console.log(error)
		res.status(500).json({ success: false, message: 'Internal server error' })
	}
})
*/


module.exports = router