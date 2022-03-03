import { AuthContext } from "../shop/auth/AuthContext"
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
import NotFound from "../shop/layout/NotFound"
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import UserInfo from './UserInfo'
import DataTable from 'react-data-table-component'
import moment from 'moment'

const Profile = () => {
    let { id } = useParams()
    let Navigate = useNavigate()

    const {
        authState: {user},
        UserState: {OneUser, userLoading, Fullinfo},
		loadOneUser,
        loadInfoUser
	} = useContext(AuthContext)
    if(!id) id =  user._id
    useEffect(() => loadInfoUser(), [])
    useEffect(() => loadOneUser(id), [])
    
    let userHTML 
   console.log(Fullinfo)
    if(userLoading){
        userHTML = (
            <h1>Loading</h1>
        )
    }else if(OneUser == null){
        return <NotFound />
   
    }else{

        if(OneUser._id == user._id){
            if(Fullinfo != null){
                const columns = [
                    // {
                    //     name: 'STT',
                    //     selector: row =>  posts.findIndex( s => s._id == row._id ),
                    //     sortable: true,
                    // },
                    {
                        name: 'Tên sản phẩm',
                        selector: row => row.product.title ,
                        sortable: true,
                    },
                    {
                        name: 'Loại sản phẩm',
                        selector: row => row.product.type_product ,
                        sortable: true,
                    },
                    {
                        name: 'Ngày mua',
                        selector: row => (<>
                            <Badge bg="danger">{moment(row.ngaymua).format("d/M/YYYY ")}</Badge>{' '}
                            <Badge bg="secondary"> {moment(row.ngaymua).format("HH:mm")}</Badge>
                          
                           </>)  ,
                        // sortable: true,
                    },
                    // {
                    //     name: 'Số tiền',
                    //     selector: row =>  (
                    //         <>
                    //         {(row.product.discount == null ?  row.product.price : row.product.discount).toLocaleString()} VNĐ
                    //         </>
                    //         )
                    // },
                    {
                        name: 'Hành động',
                        selector: row => (<> 
                            <a href={row.product.urlfile} target="_blank" className="badge bg-success">Tải xuống</a>
                      
                        </>),
                        // sortable: true,
                    }
                    
            
                ]

                //// sp đa bán
                const columns_sell = [
                    {
                        name: 'Tên sản phẩm',
                        selector: row => row.product.title ,
                        sortable: true,
                    },
                    {
                        name: 'Loại sản phẩm',
                        selector: row => row.product.type_product ,
                        sortable: true,
                    },
                    {
                        name: 'Ngày bán',
                        selector: row => (<>
                            <Badge bg="danger">{moment(row.ngaymua).format("d/M/YYYY ")}</Badge>{' '}
                            <Badge bg="secondary"> {moment(row.ngaymua).format("HH:mm")}</Badge>
                          
                           </>)  ,
                        // sortable: true,
                    },
                    {
                        name: 'Số tiền',
                        selector: row =>  (
                            <>
                            {(row.product.discount == null || row.product.discount == 0 ?  row.product.price : row.product.discount).toLocaleString()} VNĐ
                            </>
                            )
                    },
                    {
                        name: 'Người mua',
                        selector: row =>  (
                            <>
                            {(row.userId == null  ?  "Người dùng" : row.userId.fullname)}
                            </>
                            )
                    }
                   
                    
            
                ]

                userHTML = (
                    <Row>
                        <Col md="3">
                        <UserInfo Oneuser={OneUser} localtion="0" />
                        </Col>
                        <Col md="9">
                            <Row>
                                <Col md="3">
                                    <Card bg="success" className="text-white">
                                    <Card.Header>Số sản phẩm đã mua</Card.Header>
                                    <ListGroup variant="flush">

                                    <ListGroup.Item><center><h4>{Fullinfo.Checkout.length > 0 ? Fullinfo.Checkout.length : 0}</h4></center></ListGroup.Item>
                                    
                                    </ListGroup>
                                    </Card>
                                </Col>
                                <Col md="3">
                                    <Card bg="success" className="text-white">
                                    <Card.Header>Số sản phẩm đã đăng</Card.Header>
                                    <ListGroup variant="flush">

                                    <ListGroup.Item><center><h4>{Fullinfo.Product ? Fullinfo.Product.length: 0}</h4></center></ListGroup.Item>
                                    
                                    </ListGroup>
                                    </Card>
                                </Col>
                                
                                <Col md="3">
                                    <Card bg="success" className="text-white">
                                    <Card.Header>Số bài viết đã đăng</Card.Header>
                                    <ListGroup variant="flush">

                                    <ListGroup.Item><center><h4>{Fullinfo.Post ? Fullinfo.Post.length : 0}</h4></center></ListGroup.Item>
                                    
                                    </ListGroup>
                                    </Card>
                                </Col>

                                <Col md="3">
                                    <Card bg="success" className="text-white">
                                    <Card.Header>Số dư</Card.Header>
                                    <ListGroup variant="flush">

                                    <ListGroup.Item><center><h4>{(user.balance).toLocaleString()} <small><small>VNĐ</small></small></h4></center></ListGroup.Item>
                                    
                                    </ListGroup>
                                    </Card>
                                </Col>

                            </Row>
                            <hr/>
                          

                            <DataTable title="Sản Phẩm đã mua" keyField='_id' columns={columns}  data={Fullinfo.Checkout} pagination />

                            <DataTable title="Sản Phẩm đã bán" keyField='_id' columns={columns_sell}  data={Fullinfo.SCheckout} pagination />
                            </Col>
                    </Row>
                )
            }else{
                userHTML = (
                    <h1>Loading</h1>
                )
            }
        }else{
            userHTML = (
                <Row>
                <Col md="3">
                <UserInfo Oneuser={OneUser} localtion="0" />
                </Col>
                <Col md="9">
                    
                    </Col>
            </Row>
            )
        }
      
    }
    return (
        <Container>
            {userHTML}

        </Container>
    )
}

export default Profile
