import { useContext, useEffect, useState } from 'react'
import { ProductContext } from './ProductContext'

import {Spinner, Card, Row, Col, Container, Badge, Button, Modal} from 'react-bootstrap'
import DataTable from 'react-data-table-component'
import moment from 'moment'
import ToastMessage from '../layout/ToastMessage'
import { Link } from 'react-router-dom'
import UserInfo from '../../profile/UserInfo'
import ProductEdit from './ProductEdit'
const ProductAll = () => {
    const {
		ProductState: {products, product, productloading },
		getMyProduct,
        showUpdateProductModal,
        setShowUpdateProductModal,
        findProduct,
        deleteProduct
	} = useContext(ProductContext)
  
    useEffect(() => getMyProduct(), [])

    const [smShow, setSmShow] = useState({CateId: '',  show: false});
    const [show, setShow] = useState({_status: false, message: null, title: null, _style: null});

    const XoaProduct = async Id => {
        await deleteProduct(Id)
        setSmShow({show: false})
        setShow({_status: true, message: "Bạn đã xoá thành công sản phẩm", title: "Thành công", _style: ""}) //success
        setTimeout(() => setShow(null), 2500)
    }
    const EditProduct = async (id) =>{
        findProduct(id)
        setShowUpdateProductModal(true)
    }

    const OnClickDelete = async (id) =>{
        setSmShow({CateId: id,  show: true})
    }
    let i=0
    let body
    
    const columns = [

        {
            name: 'Tên sản phẩm',
            selector: row => row.title ,
            sortable: true,
        },
        {
            name: 'Loại sản phẩm',
            selector: row => row.type_product ,
            sortable: true,
        },
        {
            name: 'Chuyên mục',
            selector: row => row.category ? row.category.cname : "none" ,
            sortable: true,
        },
        {
            name: 'Giá bán',
            selector: row => (
            <>
            {row.discount == null || row.discount == 0 ? <Badge bg="success">{row.price.toLocaleString()} VNĐ</Badge> :  <> <Badge bg="secondary"><s>{row.price.toLocaleString()}</s> VNĐ</Badge> {' '} <Badge bg="success">{row.discount.toLocaleString()} VNĐ</Badge></>}
            </>
            
             ) ,
            sortable: true,
            show: true,
        },
        {
            name: 'Ngày đăng',
            selector: row => (<>
                <Badge bg="danger">{moment(row.createdAt).format("d/M/YYYY ")}</Badge>
               </>)  ,
            // sortable: true,
        },
        {
                name: 'Trạng Thái',
                selector: row => (<> 
                {row.status == 'WAITING' ? (<Badge  bg="warning" text="dark">Đang chờ duyệt</Badge>) : ''}
                {row.status == 'OK' ? (<Badge  bg="success">Đã duyệt</Badge>) : ''}
                {row.status == 'CANCEL' ? (<Badge  bg="danger">Huỷ bỏ</Badge>) : ''}
                </>),
                // sortable: true,
            },
        {
            name: 'Hành động',
            selector: row => (<>
                 
                    <span style={{cursor: 'pointer'}} onClick={EditProduct.bind(this, row._id)} className="badge bg-warning">Sửa</span>{' '}
                    <span style={{cursor: 'pointer'}} onClick={OnClickDelete.bind(this, row._id)} className="badge bg-danger">Xoá</span>
               </>)  ,
            // sortable: true,
        },
      

    ]
    console.log(products)
    if (productloading) {
		body = (
			<div className='spinner-container'>
				<Spinner animation='border' variant='info' />
			</div>
		)
	} else {
		body = (
			<>
            <Container>

            {product && <ProductEdit />}
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
        <Button className='btn btn-sm btn-success' onClick={() => XoaProduct(smShow.CateId)}>Đồng ý</Button>
        <Button className='btn btn-sm btn-danger' onClick={() => setSmShow({show: false})}>Huỷ bỏ</Button>
      </Modal.Footer>
      </Modal>
            <Row>
                <Col md="3">
                <UserInfo localtion="1" />
                </Col>
                <Col md="9">
                    <Card>
                        <Card.Body>
                        <DataTable title="Danh sách bài đăng của bạn" keyField='_id' columns={columns}  data={products} pagination />
                        </Card.Body>
                    </Card>
               
                </Col>
                <Col md="4">
                </Col>
            </Row>
           
			

				</Container>
			</>
		)
	}
    return (
        <div>
            {body}
        </div>
    )
}

export default ProductAll
