import { useContext, useEffect, useState } from 'react'
import { useParams, Link, Navigate, useNavigate } from 'react-router-dom'
import {Container, 
    Card, 
    Form, 
    Row, 
    Col, 
    ListGroup, 
    InputGroup, 
    FormControl,
    Button, 
    Modal} from 'react-bootstrap'

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CateContext } from '../shop/categories/cateContext'
import { ProductContext } from '../shop/product/ProductContext';
import NotFound from '../shop/layout/NotFound';
import ToastMessage from '../shop/layout/ToastMessage';

function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

const AdminEditProduct = () => {
  const {
    CateState: {categories, cateloading },
    GetCategoriesWType,
    } = useContext(CateContext)

    const {
        ProductState: {product, productloading },
        updateProduct,
        showUpdateProductModal,
        setShowUpdateProductModal
	} = useContext(ProductContext)
  console.log(product)
  const [updatedProduct, setUpdatedProduct] = useState(product)
  useEffect(() => setUpdatedProduct(product), [product])
  useEffect(() => GetCategoriesWType(product.type_product), [])
  const [show, setShow] = useState({_status: false, message: null, title: null, _style: null});
	const { title, description, type_product, category , price, discount, urlfile, urldemo, tags, status } = updatedProduct

   const navigate = useNavigate()
    const [alert, setAlert] = useState(null)

    const OnchangeValue = (event) =>{
      setUpdatedProduct({
          ...updatedProduct, [event.target.name]: event.target.value
          })
         
  }
  const OnchangeType = (event) =>{
      setUpdatedProduct({
          ...updatedProduct, [event.target.name]: event.target.value
          })
      GetCategoriesWType(event.target.value)
  }

  const OnchageData = ( event, editor ) => {
      const data = editor.getData();
      setUpdatedProduct({
          ...updatedProduct, description: data
      })
      // console.log( { updatedProduct, data } );
  }

  const OnchangeTags = (event) =>{
      setUpdatedProduct({
          ...updatedProduct, [event.target.name]: event.target.value.split(",")
          })
  }
  let tagsText = tags.join(",")
   
    const editproductSubmit =  async event =>{
        event.preventDefault()
        try {
          let EditproductData
        if(updatedProduct.category != 'undefined' && Object.keys(updatedProduct.category).length == 2){
          let updatedProduct_1 = {
            _id: product._id,
            title, 
            description, 
            type_product, 
            category: updatedProduct.category._id , 
            price, 
            discount,
             urlfile, 
             urldemo, 
             tags, 
             status
           
          } 
          console.log(updatedProduct_1)
          EditproductData = await updateProduct(updatedProduct_1)
        }else{
          EditproductData = await updateProduct(updatedProduct)
        }
            
           
            if(EditproductData.success){
               setShow({_status: true, message: EditproductData.message, title: "Thành công", _style: ""}) //success
                setTimeout(() => setShow(null), 3000)
              await sleep(500);
              setShowUpdateProductModal(false)
              
            }else{
              setShow({_status: true, message: EditproductData.message, title: "Thất bại", _style: ""}) //success
              setTimeout(() => setShow(null), 3000)
            
            }
          } catch (error) {
            console.log(error)
            setShow({_status: true, message: error.message, title: "Thất bại", _style: ""}) //success
            setTimeout(() => setShow(null), 2500)
          }
		

    }
       let body
    console.log(updatedProduct)
    if(product == null){
      return (<NotFound />)
    }else{
      let categoryHTML
      if(cateloading){
          categoryHTML = (
              <>
              <Form.Select aria-label="CHUYENMUC" name="category" onChange={OnchangeValue}>
              <option>Chọn một chuyên mục</option>
              </Form.Select>
              </>
          )
      } 
      else{
        //defaultValue={cate._id == category ? category : ''}
          categoryHTML = (
              <>
              <Form.Select aria-label="CHUYENMUC" name="category" onChange={OnchangeValue}>
  
              <option>Chọn một chuyên mục</option>
              {categories.map(cate => (
             product.category != null && cate._id == product.category._id ?  (<option value={cate._id} key={cate._id} selected>{cate.cname}</option>) : (<option value={cate._id} key={cate._id} >{cate.cname}</option>)
            ))}
              </Form.Select>
              </>
          )
      } 
      let OnCheck
      if(status == 'WAITING'){
          OnCheck = (
              <>
                <Form.Check
                        inline
                        label="Chờ Duyệt"
                        name="status"
                        type="radio"
                        id="WAITING-radio"
                        onChange={OnchangeValue}
                        value="WAITING"
                        defaultChecked
                    />
                    <Form.Check
                        inline
                        label="Đã Duyệt"
                        name="status"
                        type="radio"
                        id="OK-radio"
                        onChange={OnchangeValue}
                        value="OK"
                    />

                    <Form.Check
                        inline
                        label="Huỷ bỏ"
                        name="status"
                        type="radio"
                        id="CANCEL-radio"
                        onChange={OnchangeValue}
                        value="CANCEL"
                    />
              </>
          )
      }else if(status == 'OK'){
        OnCheck = (
          <>
            <Form.Check
                    inline
                    label="Chờ Duyệt"
                    name="status"
                    type="radio"
                    id="WAITING-radio"
                    onChange={OnchangeValue}
                    value="WAITING"
                   
                />
                <Form.Check
                    inline
                    label="Đã Duyệt"
                    name="status"
                    type="radio"
                    id="OK-radio"
                    onChange={OnchangeValue}
                    value="OK"
                    defaultChecked
                />

                <Form.Check
                    inline
                    label="Huỷ bỏ"
                    name="status"
                    type="radio"
                    id="CANCEL-radio"
                    onChange={OnchangeValue}
                    value="CANCEL"
                />
          </>
      )
      }else{
        OnCheck = (
          <>
            <Form.Check
                    inline
                    label="Chờ Duyệt"
                    name="status"
                    type="radio"
                    id="WAITING-radio"
                    onChange={OnchangeValue}
                    value="WAITING"
                   
                />
                <Form.Check
                    inline
                    label="Đã Duyệt"
                    name="status"
                    type="radio"
                    id="OK-radio"
                    onChange={OnchangeValue}
                    value="OK"
                   
                />

                <Form.Check
                    inline
                    label="Huỷ bỏ"
                    name="status"
                    type="radio"
                    id="CANCEL-radio"
                    onChange={OnchangeValue}
                    value="CANCEL"
                    defaultChecked
                />
          </>
      )
      }
      let typeProduct 
      if(type_product == "CODE"){
          typeProduct= (
              <>
               <Form.Check
                          inline
                          label="CODE"
                          name="type_product"
                          type="radio"
                          id="CODE-radio"
                          onChange={OnchangeType}
                          value="CODE"
                          defaultChecked
                      />
                      <Form.Check
                          inline
                          label="DOCUMENT"
                          name="type_product"
                          type="radio"
                          id="DOCUMENT-radio"
                          onChange={OnchangeType}
                          value="DOCUMENT"
                      />
                      <Form.Check
                          inline
                          label="MEDIA"
                          name="type_product"
                          type="radio"
                          id="MEDIA-radio"
                          onChange={OnchangeType}
                          value="MEDIA"
                      />
                  </>
          )
      }else if(type_product == "DOCUMENT"){
          typeProduct= (
              <>
               <Form.Check
                          inline
                          label="CODE"
                          name="type_product"
                          type="radio"
                          id="CODE-radio"
                          onChange={OnchangeType}
                          value="CODE"
                          
                      />
                      <Form.Check
                          inline
                          label="DOCUMENT"
                          name="type_product"
                          type="radio"
                          id="DOCUMENT-radio"
                          onChange={OnchangeType}
                          value="DOCUMENT"
                          defaultChecked
                      />
                      <Form.Check
                          inline
                          label="MEDIA"
                          name="type_product"
                          type="radio"
                          id="MEDIA-radio"
                          onChange={OnchangeType}
                          value="MEDIA"
                      />
                  </>
          )
      }else{
          typeProduct= (
              <>
               <Form.Check
                          inline
                          label="CODE"
                          name="type_product"
                          type="radio"
                          id="CODE-radio"
                          onChange={OnchangeType}
                          value="CODE"
                          
                      />
                      <Form.Check
                          inline
                          label="DOCUMENT"
                          name="type_product"
                          type="radio"
                          id="DOCUMENT-radio"
                          onChange={OnchangeType}
                          value="DOCUMENT"
                         
                      />
                      <Form.Check
                          inline
                          label="MEDIA"
                          name="type_product"
                          type="radio"
                          id="MEDIA-radio"
                          onChange={OnchangeType}
                          value="MEDIA"
                          defaultChecked
                      />
                  </>
          )
      }
        body = (
          <>
            <ToastMessage show={show}/>
            
          <Modal
         show={showUpdateProductModal}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          onHide={()=>setShowUpdateProductModal(false)}
        >
           <Form onSubmit={editproductSubmit}>
          <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Chỉnh sửa sản phẩm
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
      
           
            <Row className="mb-3">
            <Form.Group controlId="FormTitle">
            <Form.Label>Tên sản phẩm</Form.Label>
            <Form.Control type="text" placeholder="Tên sản phẩm" value={title} onChange={OnchangeValue} name="title" />
            </Form.Group>

            </Row>
            <Row className="mb-3" >
            <Form.Group controlId="FormContent">
            <Form.Label>Mô tả sản phẩm</Form.Label>
            <CKEditor
                            editor={ ClassicEditor }
                            data={description}
                            onReady={ editor => {
                                // You can store the "editor" and use when it is needed.
                                console.log( 'Editor is ready to use!', editor );
                            } }
                            onChange={OnchageData} 
                            // onBlur={ ( event, editor ) => {
                            //     console.log( 'Blur.', editor );
                            // } }
                            // onFocus={ ( event, editor ) => {
                            //     console.log( 'Focus.', editor );
                            // } }
                        />
                        

            </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group controlId="FormType">
                    <Form.Label>Thể loại</Form.Label><br/>
                   {typeProduct}
                </Form.Group>
            </Row> 
            <Row className="mb-3">
                <Form.Group controlId="FormCM">
                <Form.Label>Chuyên mục</Form.Label>
               {categoryHTML}
                </Form.Group>     
            </Row>

            <Row className="mb-3">   
            <Col md="6">
            <Form.Group controlId="FormPRICE">
            <Form.Label>Giá bán</Form.Label>
            <InputGroup className="mb-3">
               
                <FormControl type="number" aria-label="Giá bán" placeholder="Giá bán" name="price" value={price} onChange={OnchangeValue}/>
                <InputGroup.Text>VNĐ</InputGroup.Text>
            </InputGroup>
            </Form.Group>
            </Col> 

             <Col md="6">
            <Form.Group controlId="FormDISCOUN">
            <Form.Label>Giá khuyến mãi</Form.Label>
            <InputGroup className="mb-3">
               
                <FormControl type="number" aria-label="Giá khuyến mãi" placeholder="Giá khuyến mãi" name="discount" value={discount} onChange={OnchangeValue} />
                <InputGroup.Text>VNĐ</InputGroup.Text>
            </InputGroup>
             </Form.Group>
                </Col>              
            
            </Row>


            <Row className="mb-3">   
            <Col md="6">
            <Form.Group controlId="FormURL">
            <Form.Label>URL File</Form.Label>
            <p><small style={{color:'red', fontSize: '11px'}}> URL Drive, Dropbox, Onedrive, MediaFire, MEGA, v.v.. </small></p>
            <Form.Control placeholder="Link Download File" type='url' name="urlfile" value={urlfile}  onChange={OnchangeValue}/>
            </Form.Group>
            </Col> 

             <Col md="6">
            <Form.Group controlId="FormURLDemo">
            <Form.Label>Url Demo:</Form.Label>
            <p><small style={{color:'red', fontSize: '11px'}}> Link demo code, link ảnh, video </small></p>
            <Form.Control placeholder="Link Demo" name="urldemo" type='url' value={urldemo} onChange={OnchangeValue} />
            </Form.Group>
                </Col>              
            
            </Row>
            <Row className="mb-3">
            <Form.Group controlId="FormTags">
            <Form.Label>Tags</Form.Label>
            <p><small style={{color:'red', fontSize: '11px'}}> Các tag cách nhau bằng dấu phẩy ( ,) </small></p>
            <Form.Control placeholder="Tags" name="tags" value={tagsText} onChange={OnchangeTags}/>
            </Form.Group>
            </Row>
            
            <Row className="mb-3">
                <Form.Group controlId="FormStatus">
                    <Form.Label>Trạng thái</Form.Label><br/>
                  {OnCheck}
                </Form.Group>
            </Row> 
                           


           
           
            </Modal.Body>
      <Modal.Footer>
      <Button variant="warning" type="submit">
            Lưu thay đổi
            </Button>{' '}
        <Button onClick={() => setShowUpdateProductModal(false)}>Close</Button>
      </Modal.Footer>
      </Form>
    </Modal>
    </>
         )
    }
    return (
        <>
         {body}
        </>
       
    )
}

export default AdminEditProduct
