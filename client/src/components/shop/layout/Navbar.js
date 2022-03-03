import {useContext}  from 'react'
import { Navbar, Container, Nav, NavDropdown, Spinner } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { AuthContext } from '../auth/AuthContext'
import { CateContext } from '../categories/cateContext'

const Navbars = () => {
    const StyleNavBar = {
        marginBottom: '50px',
        backgroundColor: '#198754'
    }
    const {
      CateState: {categories, cateloading },
      GetCategoriesWType,
      } = useContext(CateContext)
    const {logout} = useContext(AuthContext)
    
    let menu
    const {authState: {authLoading, isAuthenticated, user}} = useContext(AuthContext)
 
    

    if (authLoading)
    return (
        <div className='d-flex justify-content-center mt-2'>
            <Spinner animation='border' variant='info' />
        </div>
    )
    else if (isAuthenticated) menu= ( <Nav className="ml-auto">
    <NavDropdown title={user.fullname} id="navbarScrollingDropdown">
                <NavDropdown.Item href="/profile">Trang cá nhân</NavDropdown.Item>
                {user.role == "ADMIN" ? (<NavDropdown.Item href="/admin" style={{color:'red'}}>AdminPanel</NavDropdown.Item>) : ''}
                <NavDropdown.Item href="/profile/blogs">Bài đăng</NavDropdown.Item>
                <NavDropdown.Item href="/profile/product">Sản phẩm</NavDropdown.Item>
               
                <NavDropdown.Item href="/cash">Nạp & Rút tiền</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action4">Đổi mật khẩu</NavDropdown.Item>
                <NavDropdown.Item href="#logout" onClick={logout}>
                  Đăng xuất
                </NavDropdown.Item>
              </NavDropdown>
    </Nav>)
    else  menu = ( <Nav className="ml-auto">
    <Nav.Link href="/register">Register</Nav.Link>
    <Nav.Link href="/login">Login</Nav.Link>
    </Nav>)
    let catehtml

    const onClickcate = async (type) =>{
      let getCate = await GetCategoriesWType(type)
        console.log(getCate)
        // catehtml = (
        //   getCate.map(

        //   )
        // )
    }
  
    return (
        <Navbar expand="lg" style={StyleNavBar}>
        <Container >
          {/* <Link to='/' className='navbar-brand'></Link> */}
          <Navbar.Brand href="/">ITHUB.VN</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <Nav.Link href="/" className="red">Trang Chủ</Nav.Link>
              <Nav.Link href="/shop">Cửa Hàng</Nav.Link>
             

              <NavDropdown title="Mã Nguồn" onClick={onClickcate.bind(this, "CODE")} id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="Tài Liệu" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="Đồ Hoạ" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown>
              
            <Nav.Link href="/blog">Tin Tức</Nav.Link>
            
            </Nav>
            
           {menu}
          
          </Navbar.Collapse>
        </Container>
      </Navbar>
      
    )
}

export default Navbars
