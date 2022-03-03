import { useParams, Link, useNavigate } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
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
import NotFound from '../layout/NotFound'
import { ProductContext } from '../product/ProductContext'
import { CartContext } from './CartContext'
import ToastMessage from '../layout/ToastMessage'

function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }
  
const CheckOut = () => {
    // get ID
    const { id } = useParams()
    let Navigate = useNavigate()
    // product
    const {
        ProductState: {product, productloading },
		getOneProduct,
        PayOneProduct,
        PayCart
	} = useContext(ProductContext)
   
    useEffect(() => {getOneProduct(id)}, [])

    // cart 
    const {
        CartState: {cart, cartloading },
		GetAllCart
	} = useContext(CartContext)
    useEffect(() => GetAllCart(), [])

    const [show, setShow] = useState({_status: false, message: null, title: null, _style: null});

    const OnClickPayOne = async (id) =>{
        try {
            const res = await PayOneProduct(id)
            if(res.success){
                setShow({_status: true, message: res.message, title: "Thành công", _style: ""}) //success
                setTimeout(() => setShow(null), 1500)
            }else{
                setShow({_status: true, message: res.message, title: "Thất bại", _style: ""}) //danger
                setTimeout(() => setShow(null), 1500)
            }
            await sleep(2000)
            Navigate('/')
        } catch (error) {
            console.log(error);
        }
    }

    const OnClickPay = async () =>{
        try {
            const res = await PayCart()
            if(res.success){
                setShow({_status: true, message: res.message, title: "Thành công", _style: ""}) //success
                setTimeout(() => setShow(null), 1500)
            }else{
                setShow({_status: true, message: res.message, title: "Thất bại", _style: ""}) //danger
                setTimeout(() => setShow(null), 1500)
            }
            await sleep(2000)
            Navigate('/')
        } catch (error) {
            console.log(error);
        }
    }

    let body
    let totalPrice = 0

    if(id != null && productloading){
        body = (
            <div className='spinner-container'>
            <Spinner animation='border' variant='info' />
        </div>
        )
    }else if(id != null && product != null){
        totalPrice = product.discount == null ? product.price : product.discount
        body =( 
            <Row>
                <Col md="9">
                <ListGroup as="ol" numbered>
  <ListGroup.Item
    as="li"
    className="d-flex justify-content-between align-items-start">
    <div className="ms-2 me-auto">
      <div className="fw-bold">{product.title}</div>
     
    </div>
   <i> <span style={{float:'right'}}>
         {product.discount == null ? (product.price).toLocaleString() : <><small><s>{(product.price).toLocaleString()}</s></small> {' '} {(product.discount).toLocaleString()}</>}
      {' '} VNĐ
      </span></i>
  </ListGroup.Item>
  
</ListGroup>
                </Col>
                <Col md="3">
                <ListGroup>
                    <ListGroup.Item>Đơn hàng : <i style={{float:'right'}}> {totalPrice.toLocaleString()} {' '} VNĐ</i></ListGroup.Item>
                    <ListGroup.Item>VAT (1%):  <i style={{float:'right'}}>{(totalPrice * 0.01).toLocaleString()} {' '} VNĐ</i></ListGroup.Item>
                    <ListGroup.Item>Tổng:  <i style={{float:'right'}}>{(totalPrice + totalPrice * 0.01).toLocaleString()}  {' '} VNĐ</i></ListGroup.Item>
                    <ListGroup.Item> <center><Button variant="success" onClick={OnClickPayOne.bind(this, id)}>Xác nhận thanh toán</Button></center> </ListGroup.Item>
                    </ListGroup>
                </Col>
            </Row>
        )
    }else if(id == null && cartloading){
        body = (
            <div className='spinner-container'>
            <Spinner animation='border' variant='info' />
        </div>
        )
    }else if(id == null && cart != null && cart.length !=0){
        body = ( <Row>
            <Col md="9">
        <ListGroup as="ol" numbered>
       {cart.map(row => {
            totalPrice += row.discount == null ? row.price : row.discount
       return (
        <ListGroup.Item key={row._id}
          as="li"
          className="d-flex justify-content-between align-items-start">
          <div className="ms-2 me-auto">
            <div className="fw-bold">{row.title}</div>
           
          </div>
         <i> <span style={{float:'right'}}>
               {row.discount == null ? (row.price).toLocaleString() : <><small><s>{(row.price).toLocaleString()}</s></small> {' '} {(row.discount).toLocaleString()}</>}
            {' '} VNĐ
            </span></i>
        </ListGroup.Item>
       )
      
       })}
       </ListGroup>
       </Col>
                <Col md="3">
                <ListGroup>
                    <ListGroup.Item>Đơn hàng : <i style={{float:'right'}}> {totalPrice.toLocaleString()} {' '} VNĐ</i></ListGroup.Item>
                    <ListGroup.Item>VAT (1%):  <i style={{float:'right'}}>{(totalPrice * 0.01).toLocaleString()} {' '} VNĐ</i></ListGroup.Item>
                    <ListGroup.Item>Tổng:  <i style={{float:'right'}}>{(totalPrice + totalPrice * 0.01).toLocaleString()}  {' '} VNĐ</i></ListGroup.Item>
                    <ListGroup.Item> <center><Button variant="success" onClick={OnClickPay}>Xác nhận thanh toán</Button></center> </ListGroup.Item>
                    </ListGroup>
                </Col>
            </Row>)

    }else{
        return <NotFound />
    }

   
   
    
    return (
    <Container>
        <ToastMessage show={show} />
       {body}
    </Container>
    )
}

export default CheckOut
