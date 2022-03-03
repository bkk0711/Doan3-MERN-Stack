import { useParams, Link } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import ToastMessage from '../layout/ToastMessage'

import {Container, 
    Spinner, 
    Card, 
    Badge, 
    Row, 
    Col, 
    ListGroup, 
    InputGroup, 
    FormControl,
    Button} from 'react-bootstrap'
import { CartContext } from './CartContext'
import moment from 'moment'

const Cart = () => {
    const {
        CartState: {cart, cartloading },
		GetAllCart,
        RemoveFromCart,
        RemoveAllFromCart
	} = useContext(CartContext)

    useEffect(() => GetAllCart(), [])
    const [show, setShow] = useState({_status: false, message: null, title: null, _style: null});
    const RemoveFromCartOnClick = async id =>{
        try {
            const res = await RemoveFromCart(id)
            if(res.success){
                setShow({_status: true, message: res.message, title: "Thành công", _style: ""}) //success
                setTimeout(() => setShow(null), 1500)
                

            }else{
                setShow({_status: true, message: res.message, title: "Thất bại", _style: ""}) //success
                setTimeout(() => setShow(null), 1500)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const RemoveAll = async (event) =>{
        try {
            const res = await RemoveAllFromCart()
            if(res.success){
                setShow({_status: true, message: res.message, title: "Thành công", _style: ""}) //success
                setTimeout(() => setShow(null), 1500)
                
    
            }else{
                setShow({_status: true, message: res.message, title: "Thất bại", _style: ""}) //success
                setTimeout(() => setShow(null), 1500)
            }
        } catch (error) {
            console.log(error)
        }
      
    }
    let body 
    let totalPrice = 0

    if(cartloading){
        body = (
            <div className='spinner-container'>
            <Spinner animation='border' variant='info' />
        </div>
        )
    }else if(cart == null || cart.length == 0){ // || 
        body = (
            <>
            KHONG COS GI
            </>
        )

    }else{
        // console.log(cart)
        
        body = (
         
            <ListGroup as="ol" numbered>
               
            {cart.map(row => {
                if(row.discount == null ){
                    totalPrice += row.price
                }else{
                    totalPrice += row.discount
                }
                return (
                <ListGroup.Item
                as="li"
                key={row._id}
                className="d-flex justify-content-between align-items-start"
              >
                <div className="ms-2 me-auto">
                  <div className="fw-bold">{row.title}</div>
                 
                  <small>
                  <small>   <Badge bg="danger" onClick={RemoveFromCartOnClick.bind(this, row._id)} style={{ cursor: 'pointer'}}>X</Badge> {' '}
                      
                     </small>  <Badge bg="success">{row.type_product} / {row.category ? row.category.cname : ''}</Badge>
                </small>
                </div>
                {
                    row.discount == null ? ( <><Badge bg="danger" pill>
                    {(row.price).toLocaleString()} VNĐ
                    </Badge> </>) : (<>
                        <Badge bg="secondary" pill><s>
                {(row.price).toLocaleString()}</s> VNĐ
                </Badge>
                <Badge bg="danger" pill>
                {(row.discount).toLocaleString()} VNĐ
                </Badge>
                    </>)
                }
              
              </ListGroup.Item>
            )})}
            </ListGroup>
        )
    }
    return (
        <Container>
             <ToastMessage show={show}/>
            <Row>
                <Col md="9">
                    {body}
                </Col>
                <Col md="3">
                <ListGroup>
                <ListGroup.Item>
                <div className="d-grid">
                    <Button variant="warning" onClick={RemoveAll} size="sm">Xoá giỏ hàng</Button>
                    </div>   
                </ListGroup.Item>
                </ListGroup>
                    <hr/>
                <ListGroup>
                <ListGroup.Item>Đơn hàng của bạn : <b  style={{float: 'right'}}> {cart == null ? 0: cart.length} SP</b></ListGroup.Item>
                <ListGroup.Item>Giá trị: <b  style={{float: 'right'}}> {totalPrice.toLocaleString()} VNĐ</b></ListGroup.Item>
                <ListGroup.Item>VAT (1%) : <b  style={{float: 'right'}}> {(totalPrice*1/100).toLocaleString()} VNĐ</b></ListGroup.Item>
                <ListGroup.Item>Tổng: <b  style={{float: 'right'}}>{(totalPrice+totalPrice*1/100).toLocaleString()} VNĐ</b></ListGroup.Item>
                <ListGroup.Item>
                    <div className="d-grid">
                    <Button variant="danger" href="/checkout" size="sm">Tiến hành thanh toán</Button>
                    </div>    
                </ListGroup.Item>
                </ListGroup>
                
                </Col>
            </Row>
           
       </Container>
    )
}

export default Cart
