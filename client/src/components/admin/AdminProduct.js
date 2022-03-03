
import AdminMenu from './AdminMenu'
import {Container, 
    Spinner, 
    Row, 
    Col, 
    Modal,
    Button} from 'react-bootstrap'
import { Fragment, useContext, useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { ProductContext } from '../shop/product/ProductContext'
import DataTable from 'react-data-table-component'
import moment from 'moment'
import AdminEditProduct from './AdminEditProduct'
import ToastMessage from '../shop/layout/ToastMessage';
const AdminProduct = () => {
    const {
		ProductState: {product, products, productloading },
		getAllProduct,
        AdminViewProduct,
        findProduct,
        showUpdateProductModal,
        setShowUpdateProductModal,
        deleteProduct
	} = useContext(ProductContext)
    useEffect(() => getAllProduct(), [])
    const navigate = useNavigate()
    const EditProduct = postId => {
		findProduct(postId)
        setShowUpdateProductModal(true)
	}
    const [smShow, setSmShow] = useState({CateId: '',  show: false});
    const [show, setShow] = useState({_status: false, message: null, title: null, _style: null});

    const XoaProduct = async Id => {
        await deleteProduct(Id)
        setSmShow({show: false})
        setShow({_status: true, message: "Bạn đã xoá thành công sản phẩm", title: "Thành công", _style: ""}) //success
        setTimeout(() => setShow(null), 2500)
    }
    const OnClickDelete = (id) =>{
        setSmShow({CateId: id,  show: true})
    }
 
    // console.log(products)
    let body 
    if(productloading){
        body =(
        <div className='d-flex justify-content-center mt-2'>
            <Spinner animation='border' variant='info' />
        </div>
        )
    }else{
        const columns = [
            {
                name: 'STT',
                selector: row =>  products.findIndex( s => s._id == row._id ) + 1,
                sortable: true,
            },
            {
                name: 'Người đăng',
                selector: row => row.userId == null ? 'Người dùng': row.userId.username ,
                sortable: true,
            },
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
                selector: row => row.category == null ? 'none' :  row.category.cname,
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
                name: 'Giá bán',
                selector: row =>  (
                    <>
                    {(row.discount == null ?  row.price : row.discount).toLocaleString()} VNĐ
                    </>
                    )
            },
            {
                name: 'Trạng thái',
                selector: row =>  (
                    <>
                    {row.status == 'WAITING' ? 'Chờ duyệt' : row.status == 'OK' ? 'Đã duyệt' : 'Huỷ bỏ' }
                    </>
                    )
            },
            {
                name: 'Hành động',
                selector: row => (<> 
                    <Link to={'/admin/product/view/'+row._id} className="badge bg-success">Xem</Link> {' '}
                    <span style={{cursor: 'pointer'}} onClick={EditProduct.bind(this, row._id)} className="badge bg-warning">Sửa</span>{' '}
                    <span style={{cursor: 'pointer'}} onClick={OnClickDelete.bind(this, row._id)} className="badge bg-danger">Xoá</span>
                </>),
                // sortable: true,
            }
            
    
        ]
        body=(
            <DataTable title="Danh sách sản phẩm" keyField='_id' columns={columns}  data={products} pagination />
        )
    }
    return (
        <Container>
             <ToastMessage show={show} />
            {product && <AdminEditProduct />}
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
                    <AdminMenu localtion="1"/>
            </Col>
            <Col md="9">
                {body}
                </Col>

       
        </Row>
        
    </Container>
      
    )
}

export default AdminProduct
