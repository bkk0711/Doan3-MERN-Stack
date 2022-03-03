import {useContext, useState, useEffect} from 'react'
import {Container, 
    Card, 
    Form, 
    Row, 
    Col, 
    ListGroup, 
    InputGroup, 
    FormControl,
    Button,
    Spinner} from 'react-bootstrap'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import AlertMessage from '../layout/AlertMessage'
import { useNavigate } from 'react-router-dom'
import { ProductContext } from './ProductContext'
import { CateContext } from '../categories/cateContext'



const ProductAdd = () => {
    // 
    const {
        CateState: {categories, cateloading },
        GetCategoriesWType,

    } = useContext(CateContext)
    
    const {AddNewProduct} = useContext(ProductContext)
    

    const [alert, setAlert] = useState(null)
    const [disbtn, setdisbtn] = useState(false)
    const [AddProductForm, setAddProductForm] = useState({
        title: '',
        description: '',
        type_product: '',
        category: '',
        price: '',
        discount: '',
        urlfile: '',
        urldemo: '',
        tags : '',
        thumbnail: ''
    })
    const {
    title, description, type_product, category, price, discount, urlfile, urldemo, tags, thumbnail
    } = AddProductForm
    const navigate = useNavigate()
    const AddProductSubmit = async event =>{
        event.preventDefault()
        setdisbtn(true)
        try{
        const formData = new FormData();
        formData.append('thumbnail', AddProductForm.thumbnail);
        formData.append('title', AddProductForm.title);
        formData.append('description', AddProductForm.description);
        formData.append('type_product', AddProductForm.type_product);
        formData.append('category', AddProductForm.category);
        formData.append('price', AddProductForm.price);
        formData.append('discount', AddProductForm.discount);
        formData.append('urlfile', AddProductForm.urlfile);
        formData.append('urldemo', AddProductForm.urldemo);
        formData.append('tags', AddProductForm.tags);
        const AddPostData = await AddNewProduct(formData)
        if(AddPostData.success){
            setAddProductForm({
                ...AddProductForm,  
                title: '',
                description: '',
                price: '',
                discount: '',
                urlfile: '',
                urldemo: '',
                tags : '',
                thumbnail: ''
                })   
                setdisbtn(false)
                    setAlert({ type: 'success', message: AddPostData.message })
                            setTimeout(() => setAlert(null), 4000)
                            setTimeout(() => navigate('/'), 1500)
                            
                            
                }else{
                    setdisbtn(false)
                    setAlert({ type: 'danger', message: AddPostData.message })
                            setTimeout(() => setAlert(null), 5000)
                }
                
        
        // try {
        //     const AddPostData = await AddNewProduct(AddProductForm)
        //     if(AddPostData.success){
        //         setAlert({ type: 'success', message: AddPostData.message })
        //                 setTimeout(() => setAlert(null), 4000)
        //                 setTimeout(() => navigate('/'), 1500)
                        
        //     }else{
        //         setAlert({ type: 'danger', message: AddPostData.message })
        //                 setTimeout(() => setAlert(null), 5000)
        //     }
        } catch (error) {
            console.log(error)
        }
    }
    const OnchangeAdd = (event) =>{
        setAddProductForm({
            ...AddProductForm, [event.target.name]: event.target.value
            })
           
    }
    const handlePhoto = (e) => {
        setAddProductForm({...AddProductForm, thumbnail: e.target.files[0]});
    }

    const OnchangeType = (event) =>{
        setAddProductForm({
            ...AddProductForm, [event.target.name]: event.target.value
            })
        GetCategoriesWType(event.target.value)
    }

    const OnchageData = ( event, editor ) => {
        const data = editor.getData();
        setAddProductForm({
            ...AddProductForm, description: data
        })
        // console.log( { AddProductForm, data } );
    }

    const OnchangeTags = (event) =>{
        setAddProductForm({
            ...AddProductForm, [event.target.name]: event.target.value.split(",")
            })
    }
    let categoryHTML

    if(cateloading){
        categoryHTML = (
            <>
            <Form.Select aria-label="CHUYENMUC" name="category" onChange={OnchangeAdd}>
            <option>Chọn một chuyên mục</option>
            </Form.Select>
            </>
        )
    } 
    else{
        categoryHTML = (
            <>
            <Form.Select aria-label="CHUYENMUC" name="category" onChange={OnchangeAdd}>

            <option>Chọn một chuyên mục</option>
            {categories.map(cate => (
						<option value={cate._id} key={cate._id} >{cate.cname}</option>
					))}
            </Form.Select>
            </>
        )
    } 
    return (
        <Container>
        <Row>
            <Col>
            <Card >

        <Card.Header>Đăng sản phẩm mới</Card.Header>
        <Card.Body>

            <Form onSubmit={AddProductSubmit} encType='multipart/form-data'>
            <AlertMessage info={alert} />
            <Row className="mb-3">
            <Form.Group controlId="FormTitle">
            <Form.Label>Tên sản phẩm</Form.Label>
            <Form.Control type="text" placeholder="Tên sản phẩm" name="title" onChange={OnchangeAdd}/>
            </Form.Group>

            </Row>
            <Row className="mb-3" >
            <Form.Group controlId="FormContent">
            <Form.Label>Mô tả sản phẩm</Form.Label>
            <CKEditor
                            editor={ ClassicEditor }
                            data="<p></p><p></p>"
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
                    />
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
               
                <FormControl type="number" aria-label="Giá bán" placeholder="Giá bán" name="price" onChange={OnchangeAdd}/>
                <InputGroup.Text>VNĐ</InputGroup.Text>
            </InputGroup>
            </Form.Group>
            </Col> 

             <Col md="6">
            <Form.Group controlId="FormDISCOUN">
            <Form.Label>Giá khuyến mãi</Form.Label>
            <InputGroup className="mb-3">
               
                <FormControl type="number" aria-label="Giá khuyến mãi" placeholder="Giá khuyến mãi" name="discount" onChange={OnchangeAdd}/>
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
            <Form.Control placeholder="Link Download File" type='url' name="urlfile" onChange={OnchangeAdd}/>
            </Form.Group>
            </Col> 

             <Col md="6">
            <Form.Group controlId="FormURLDemo">
            <Form.Label>Url Demo:</Form.Label>
            <p><small style={{color:'red', fontSize: '11px'}}> Link demo code, link ảnh, video </small></p>
            <Form.Control placeholder="Link Demo" name="urldemo" type='url' onChange={OnchangeAdd}/>
            </Form.Group>
                </Col>              
            
            </Row>
            <Row className="mb-3">
            <Form.Group controlId="FormTags">
            <Form.Label>Tags</Form.Label>
            <p><small style={{color:'red', fontSize: '11px'}}> Các tag cách nhau bằng dấu phẩy ( ,) </small></p>
            <Form.Control placeholder="Tags" name="tags" onChange={OnchangeTags}/>
            </Form.Group>
            </Row>
            <Row className="mb-3">

            <Form.Group controlId="FormThumbnail">
            <Form.Label>Thumbnail</Form.Label>
            <br/>
            <input 
                type="file" 
                accept=".png, .jpg, .jpeg"
                name="thumbnail"
                onChange={handlePhoto}
            />
            </Form.Group>
            </Row>        


            <Button variant="primary" disabled={disbtn} type="submit">
            Đăng bài viết
            </Button>
            </Form>
            </Card.Body>
            </Card>
            </Col>
           
        </Row>
        </Container>
    )
}

export default ProductAdd
