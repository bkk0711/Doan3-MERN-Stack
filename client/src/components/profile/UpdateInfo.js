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
    Button,
    Form} from 'react-bootstrap'
import NotFound from "../shop/layout/NotFound"
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import UserInfo from './UserInfo'
import DataTable from 'react-data-table-component'
import moment from 'moment'

const UpdateInfo = () => {
    let { id } = useParams()
    let Navigate = useNavigate()

    const {authState: {authLoading, user},
    EditUser,
    ChangePass
    } = useContext(AuthContext)
   
     
    const [infoForm, setinfoForm] = useState(user)
    const { fullname, email } = infoForm

    const onChangeForm = event =>
    setinfoForm({ ...infoForm, [event.target.name]: event.target.value })

    
    let userHTML 
   console.log(infoForm)
    if(authLoading){
        userHTML = (
            <h1>Loading</h1>
        )

    }else{
        userHTML = (<>
                 <Form>
                     <Row>
                         <Col md="6">
                         <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>UserName</Form.Label>
                            <Form.Control type="text" value={user.username} disabled/>
                            
                        </Form.Group>
                         </Col>
                         <Col md="6">
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Ngày tham gia</Form.Label>
                                <Form.Control type="text" value={moment(user.createdAt).format("DD/MM/YYYY")} disabled />
                            </Form.Group>
                           
                         </Col>
                         <Col md="6">
                         <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Họ & Tên</Form.Label>
                            <Form.Control type="text" value={fullname} onChange={onChangeForm} name="fullname"/>
                            
                        </Form.Group>
                         </Col>
                         <Col md="6">
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" value={email} onChange={onChangeForm} name="email" />
                            </Form.Group>
                           
                         </Col>
                     </Row>
                
                <Button variant="success" type="submit">
                    Cập nhật thông tin
                </Button>
                </Form> 

                <hr />
<br/>
                <Form>
                     <Row>
                     <Col md="3"></Col>
                         <Col md="6">
                         <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Mật khẩu cũ</Form.Label>
                            <Form.Control type="text" />
                            
                        </Form.Group>


                        <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Mật khẩu mới</Form.Label>
                                <Form.Control type="text"  />
                            </Form.Group>


                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Nhập lại mật khẩu mới</Form.Label>
                                <Form.Control type="text"  />
                            </Form.Group>

                            <Button variant="success" type="submit">
                   Đổi mật khẩu
                </Button>

                         </Col>
                         
                     </Row>
                
               
                </Form> 

</>)
    }
    return (
        <Container>
            <Row>
                <Col md="3">
                <UserInfo localtion="3" />
                </Col>
                <Col md="9">
                {userHTML}
                </Col>
            </Row>
           

        </Container>
    )
}

export default UpdateInfo
