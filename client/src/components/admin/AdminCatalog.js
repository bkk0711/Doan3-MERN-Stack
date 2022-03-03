
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
import DataTable from 'react-data-table-component'
import moment from 'moment'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { CateContext } from '../shop/categories/cateContext'
import CateEdit from '../shop/categories/CateEdit'
import ToastMessage from '../shop/layout/ToastMessage'
const AdminCatalog = () => {
    const {
        CateState: {category, categories, cateloading },
        AdminGetCategories,
        findCate,
        setModalShow,
        deleteCate
    } = useContext(CateContext)

    useEffect(() => AdminGetCategories(), [])
    const [smShow, setSmShow] = useState({CateId: '',  show: false});
    const [show, setShow] = useState({_status: false, message: null, title: null, _style: null});
    const OnClickEdit = (id) =>{
        findCate(id)
        setModalShow(true)
    }
    const OnClickDelete = (id) =>{
        setSmShow({CateId: id,  show: true})
    }
    const XoaCate = async (id) => {
        await deleteCate(id)
        setSmShow({show: false})
        setShow({_status: true, message: "Bạn đã xoá thành công chuyên mục", title: "Thành công", _style: ""}) //success
        setTimeout(() => setShow(null), 2500)
    }
    // console.log(categories)
    let body
    if(cateloading){
        body =(
            <div className='d-flex justify-content-center mt-2'>
                <Spinner animation='border' variant='info' />
            </div>
            )
    }else{
        body =(
            <>
            <Row>
                <Col md="12">
                    <Link to="/admin/categories/add" className="btn btn-success"> Thêm chuyên mục </Link>
                </Col><br/><br/>
            
                <Col md="4">
                <Card className='text-white bg-success'>
  <Card.Header>Code</Card.Header>
  
            {categories.map(row =>{
                if(row.type_product == "CODE"){
                   return <ListGroup.Item key={row._id} className={row.status == 'OFF' ? 'list-group-item-danger' : ''}>{row.cname}   <span style={{float:'right'}}> 
                   <Button className="badge bg-warning btn-warning" onClick={OnClickEdit.bind(this, row._id)}>Sửa</Button>{' '}
                   <Button className="badge bg-danger btn-danger" onClick={OnClickDelete.bind(this, row._id)}>Xoá</Button>
                    </span>
                    </ListGroup.Item>
                    //  <CateEdit cate={row} key={"edit_"+row._id} show={modalShow} onHide={() => setModalShow(false)} />
                     
                    
                
                }
            }
                
               
            )}
          
            </Card>
            </Col>
            <Col md="4">
            <Card className='text-white bg-success'>
  <Card.Header>Document</Card.Header>
  
            {categories.map(row =>{
                if(row.type_product == "DOCUMENT"){
                   return <ListGroup.Item key={row._id} className={row.status == 'OFF' ? 'list-group-item-danger' : ''}>{row.cname}
                    <span style={{float:'right'}}> 
                    <Button className="badge bg-warning btn-warning" onClick={OnClickEdit.bind(this, row._id)}>Sửa</Button>{' '}
                    <Button className="badge bg-danger btn-danger" onClick={OnClickDelete.bind(this, row._id)}>Xoá</Button>
                    </span>
                    </ListGroup.Item>
                
                }
            }
                
               
            )}
          
            </Card>
            </Col>
            <Col md="4">
            <Card className='text-white bg-success'>
  <Card.Header>Media</Card.Header>
  
            {categories.map(row =>{
                if(row.type_product == "MEDIA"){
                   return <ListGroup.Item key={row._id} className={row.status == 'OFF' ? 'list-group-item-danger' : ''}>{row.cname}
                    <span style={{float:'right'}}> 
                    <Button className="badge bg-warning btn-warning" onClick={OnClickEdit.bind(this, row._id)}>Sửa</Button>{' '} 
                    <Button className="badge bg-danger btn-danger" onClick={OnClickDelete.bind(this, row._id)}>Xoá</Button>
                    </span>
                    </ListGroup.Item>
                
                }
            }
                
               
            )}
          
            </Card>
            </Col>
            </Row>
            
            </>
            )
    }
    return (
        <Container>
            <ToastMessage show={show} />
            {category !== null && <CateEdit />}
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
        <Button className='btn btn-sm btn-success' onClick={() => XoaCate(smShow.CateId)}>Đồng ý</Button>
        <Button className='btn btn-sm btn-danger' onClick={() => setSmShow({show: false})}>Huỷ bỏ</Button>
      </Modal.Footer>
      </Modal>

        <Row>

            <Col md="3">
                    <AdminMenu localtion="3"/>
            </Col>
            <Col md="9">
                {body}
                </Col>

       
        </Row>
        
    </Container>
      
    )
}

export default AdminCatalog
