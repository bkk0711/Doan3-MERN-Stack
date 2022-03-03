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
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'

const UserInfo = ({Oneuser, localtion}) => {
    const {
        authState: {user}
	} = useContext(AuthContext)

    let body
    let NoAVT = "/img/noavt.png"
    let StyleActive = {background: '#198754', color: 'white'}
    if(Oneuser== null || Oneuser._id == user._id){
        body = (
        <Card>
            <Card.Body>
                <center>
                    <img src={NoAVT} className="rounded-circle" style={{width: '70%'}} />
                    <Card.Title>{user.fullname}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">@{user.username}</Card.Subtitle>
                    <Link to="/blog/add" className='btn btn-success btn-sm btn-block' >Đăng Bài Viết</Link>
                {' '}
                <Link to="/product/add" className='btn btn-danger btn-sm btn-block'>Đăng Sản Phẩm</Link>
                
                    </center>
                
            </Card.Body>
            
                <Link to="/profile" className="list-group-item" style={localtion == 0 ? StyleActive : {}}><i className="fas fa-tachometer-alt"></i> Tổng quan</Link>
                <Link to="/profile/products" className="list-group-item" style={localtion == 1 ? StyleActive : {}}><i className="fas fa-store"></i> Quản lý sản phẩm</Link>
                <Link to="/profile/blogs" className="list-group-item" style={localtion == 2 ? StyleActive : {}}><i className="fas fa-book"></i> Quản lý bài viết</Link>
                <Link to="/profile/info" className="list-group-item" style={localtion == 3 ? StyleActive : {}}><i className="fas fa-user-edit"></i> Cập nhật thông tin</Link>
                <Link to="/cash" className="list-group-item" style={localtion == 4 ? StyleActive : {}}><i className="fad fa-credit-card-front"></i> Nạp & Rút</Link>
                <Link to="/profile" className="list-group-item"><i className="fad fa-sign-out-alt"></i> Đăng xuất</Link>
                      
        </Card>
        )
    }else{
        body = (
            <Card>
            <Card.Body>
                <center>
                    <img src={NoAVT} className="rounded-circle" style={{width: '70%'}} />
                    <Card.Title>{Oneuser.fullname}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">@{Oneuser.username}</Card.Subtitle>
                    <div className="d-grid gap-2">
                    <Link to="/report" className='btn btn-danger btn-sm btn-block'>Tố Cáo</Link>
                    </div>
              
                
                    </center>
                
            </Card.Body>
            
                <Link to="/profile" className="list-group-item" style={localtion == 0 ? StyleActive : {}} ><i className="fas fa-tachometer-alt"></i> Tổng quan</Link>
                <Link to="/profile" className="list-group-item">Sản phẩm đang bán</Link>
                <Link to="/profile" className="list-group-item">Bài viết công khai</Link>
            
                      
        </Card>
            )
    }
    
    return (
       <>
       {body}
       </>
    )
}

export default UserInfo
