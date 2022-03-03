
import AdminMenu from './AdminMenu'
import {Container, 
    Spinner, 
    Card, 
    Badge, 
    Row, 
    Col, 
    ListGroup, 
    InputGroup, 
    Form,
    Button,
    Modal} from 'react-bootstrap'
import { AuthContext } from '../shop/auth/AuthContext'
import { Fragment, useContext, useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import moment from 'moment'
import { useParams, Link, useNavigate } from 'react-router-dom'
import ToastMessage from '../shop/layout/ToastMessage';
import AdminAddNewUser from './AdminAddNewUser'
import AdminEditUser from './AdminEditUser'
const AdminUser = () => {
    const {
        UserState: {OneUser, users, userLoading },
        AdminGetUser,
        DeleteOneUser,
        setModelShow,
        setModelEditShow,
        findUser
    } = useContext(AuthContext)
    // useEffect(() => {
    //     document.title = "Quản lý thành viên"
    //  }, []);

    useEffect(() => AdminGetUser(), [])
    const [smShow, setSmShow] = useState({CateId: '', show: false});

    const [show, setShow] = useState({_status: false, message: null, title: null, _style: null});

    const OnClickEditUer = async id =>{
        findUser(id)
        setModelEditShow({show: true})

    }

    const onClickXoa = async id =>{
        setSmShow({CateId: id, show: true})
    }
 
    const Xoa = async id =>{
        DeleteOneUser(id)
        setSmShow({show: false})
        setShow({_status: true, message: "Bạn đã xoá thành công người dùng", title: "Thành công", _style: ""}) //success
        setTimeout(() => setShow(null), 2500)
    }
    console.log(users)
    let body
    if(userLoading){
        body =(
            <div className='d-flex justify-content-center mt-2'>
                <Spinner animation='border' variant='info' />
            </div>
            )
    }else{
        const columns = [
            // {
            //     name: 'STT',
            //     selector: row =>  users.findIndex( s => s._id == row._id ) + 1,
            //     sortable: true,
            // },
            {
                name: 'UserName',
                selector: row => row.username ,
                sortable: true,
            },
            {
                name: 'Họ & Tên',
                selector: row => row.fullname ,
                sortable: true,
            },
            {
                name: 'Email',
                selector: row => row.email ,
                sortable: true,
            },
            {
                name: 'Chức Vụ',
                selector: row => row.role ,
                sortable: true,
            },
            {
                name: 'Số dư',
                selector: row => row.balance.toLocaleString() + ' VNĐ' ,
                sortable: true,
            },
            {
                name: 'Ngày đăng ký',
                selector: row => (<>
                 {moment(row.createdAt).format("d/M/YYYY")}
                   </>)  ,
                // sortable: true,
            },
            {
                name: 'Hành động',
                selector: row => (<> 
                    <Link to={'/profile/'+row._id} className="badge bg-success">Xem</Link> {' '}
                    <span style={{cursor: 'pointer'}} onClick={OnClickEditUer.bind(this, row._id)} className="badge bg-warning">Sửa</span>{' '}
                    <span style={{cursor: 'pointer'}} onClick={onClickXoa.bind(this, row._id)} className="badge bg-danger">Xoá</span>
                </>),
                // sortable: true,
            }
            
    
        ]
        body =(
            <DataTable title="Danh sách người dùng" keyField='_id' columns={columns}  data={users} pagination />
           
            )
    }
    return (
        <Container>
           
             <ToastMessage show={show} />
             <AdminAddNewUser />
             {OneUser && <AdminEditUser />}
             <Modal
        size="sm"
        show={smShow.show}
        onHide={() => setSmShow(false)}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-sm">
            Xác nhận xoá
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>Bạn đã chắc chắn muốn xoá chưa? Bạn không thể phục hồi sau khi xoá</Modal.Body>
        <Modal.Footer>
        <Button className='btn btn-sm btn-success' onClick={() => Xoa(smShow.CateId)}>Đồng ý</Button>
        <Button className='btn btn-sm btn-danger' onClick={() => setSmShow({show: false})}>Huỷ bỏ</Button>
      </Modal.Footer>
      </Modal>
      
        <Row>
            <Col md="3">
           
                    <AdminMenu localtion="4"/>
            </Col>
            <Col md="9">
            <Button variant='success' onClick={() => setModelShow({show: true})}>Thêm người dùng mới</Button>
            <br/>
                {body}
                </Col>

       
        </Row>
        
    </Container>
      
    )
}

export default AdminUser
