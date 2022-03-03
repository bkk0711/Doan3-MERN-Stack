
import AdminMenu from './AdminMenu'
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
    Modal} from 'react-bootstrap'

import { Fragment, useContext, useEffect, useState } from 'react'
import { PostContext } from '../blog/context/PostContext'
import DataTable from 'react-data-table-component'
import moment from 'moment'
import { useParams, Link, useNavigate } from 'react-router-dom'
import AdminEditPost from './AdminEditPost'
import ToastMessage from '../shop/layout/ToastMessage';
const AdminBlog = () => {
    const {
		PostState: {post, posts, postsloading },
		AdminGetPosts,
        findPost,
        deletePost,
        showUpdatePostModal,
        setShowUpdatePostModal
	} = useContext(PostContext)

    useEffect(() => AdminGetPosts(), [])

    const Navigate = useNavigate()
    const [smShow, setSmShow] = useState({CateId: '',  show: false});
    const [show, setShow] = useState({_status: false, message: null, title: null, _style: null});

    const ViewBlog = async id =>{
        findPost(id)
        Navigate('/admin/blogs/view/'+ id)
    }
    const OnClickUpdate = id =>{
        findPost(id)
        setShowUpdatePostModal(true)
    }
    const OnClickXoa = async id =>{
        setSmShow({CateId: id,  show: true})
    }

    const Xoa = async id => {
        await deletePost(id)
        setSmShow({show: false})
        setShow({_status: true, message: "Bạn đã xoá thành công bài đăng", title: "Thành công", _style: ""}) //success
        setTimeout(() => setShow(null), 2500)
    }
    let body
    if(postsloading){
        body =(
        <div className='d-flex justify-content-center mt-2'>
            <Spinner animation='border' variant='info' />
        </div>
        )
    }else{
        const columns = [
            {
                name: 'STT',
                selector: row =>  posts.findIndex( s => s._id == row._id ) + 1,
                sortable: true,
            },
            {
                name: 'Người đăng',
                selector: row => row.userId == null ? 'Người dùng': row.userId.username ,
                sortable: true,
            },
            {
                name: 'Tên bài viết',
                selector: row => row.title ,
                sortable: true,
            },
            {
                name: 'Tags',
                selector: row => (row.tags).join(', ') ,
                sortable: true,
            },
            {
                name: 'Ngày cập nhật',
                selector: row => (<>
                 {moment(row.updatedAt).format("d/M/YYYY  HH:mm")}
                   </>)  ,
                // sortable: true,
            },
            {
                name: 'Trạng thái',
                selector: row =>  (
                    <>
                    {row.status == 'WAITING' ? 'Đang duyệt' : row.status == 'OK' ? 'Đã duyệt' : 'Huỷ bỏ' }
                    </>
                    )
            },
            {
                name: 'Hành động',
                selector: row => (
                <> 
                     <span style={{cursor: 'pointer'}} onClick={ViewBlog.bind(this, row._id)} className="badge bg-success">Xem</span> {' '}
                    <span style={{cursor: 'pointer'}} onClick={OnClickUpdate.bind(this, row._id)} className="badge bg-warning">Sửa</span>{' '}
                    <span style={{cursor: 'pointer'}} onClick={OnClickXoa.bind(this, row._id)} className="badge bg-danger">Xoá</span>
                </>),
                // sortable: true,
            }
            
    
        ]
        body=(
            <DataTable title="Danh sách bài đăng" keyField='_id' columns={columns}  data={posts} pagination />
        )
    }
    console.log(posts)
    return (
        <Container>
             <ToastMessage show={show} />
            {post && <AdminEditPost />}
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
                    <AdminMenu localtion="2"/>
            </Col>
            <Col md="9">
                {body}
                </Col>

       
        </Row>
        
    </Container>
      
    )
}

export default AdminBlog
