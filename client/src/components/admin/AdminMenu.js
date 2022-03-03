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

const AdminMenu = ({localtion}) => {
    const {
        authState: {user}
	} = useContext(AuthContext)
    
    const logo = ""
    let StyleActive = {background: '#198754', color: 'white'}
    return (
        <Card>
        <Card.Body>
            <center>
                {/* <img src={NoAVT} className="rounded-circle" style={{width: '70%'}} /> */}
                <Card.Title>{user.fullname}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">@{user.username}</Card.Subtitle>
              
                </center>
            
        </Card.Body>
        
            <Link to="/admin" className="list-group-item" style={localtion == 0 ? StyleActive : {}}><i className="fas fa-tachometer-alt"></i> Tổng quan</Link>
            <Link to="/admin/products" className="list-group-item" style={localtion == 1 ? StyleActive : {}}><i className="fas fa-shopping-cart"></i> Quản lý sản phẩm</Link>
            <Link to="/admin/blogs" className="list-group-item" style={localtion == 2 ? StyleActive : {}}><i className="fas fa-book"></i> Quản lý bài đăng</Link>
            <Link to="/admin/categories" className="list-group-item" style={localtion == 3 ? StyleActive : {}}><i className="fas fa-rss-square"></i> Quản lý chuyên mục</Link>
            <Link to="/admin/users" className="list-group-item" style={localtion == 4 ? StyleActive : {}}><i className="far fa-users"></i> Quản lý thành viên</Link>
            <Link to="/admin/cash" className="list-group-item" style={localtion == 6 ? StyleActive : {}}><i className="far fa-users"></i> Quản lý nạp & rút</Link>
            <Link to="/admin/setting" className="list-group-item" style={localtion == 5 ? StyleActive : {}}><i className="fad fa-cogs"></i> Cập nhật thông tin</Link>
            
                  
    </Card>
    )
}

export default AdminMenu
