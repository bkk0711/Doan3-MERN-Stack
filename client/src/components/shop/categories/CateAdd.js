import {useContext, useState} from 'react'
import {Container, 
    Card, 
    Form, 
    Row, 
    Col, 
    ListGroup, 
    InputGroup, 
    FormControl,
    Button} from 'react-bootstrap'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import AlertMessage from '../layout/AlertMessage'
import { useNavigate, Link } from 'react-router-dom'
import { CateContext } from './cateContext'


const CateAdd = () => {
    const {AddCategory} = useContext(CateContext)
    const navigate = useNavigate()
    const [alert, setAlert] = useState(null)
    const [AddCategoryForm, setAddCategoryForm] = useState({
        cname: '',
        description: '',
        type_product: ''
    })
    const {cname, description, type_product} = AddCategoryForm

    const AddProductSubmit = async event =>{
        event.preventDefault()
        try {
            const AddCategoryData = await AddCategory(AddCategoryForm)
            if(AddCategoryData.success){
              setAlert({ type: 'success', message: AddCategoryData.message })
                      setTimeout(() => setAlert(null), 5000)
            setAddCategoryForm({
            ...AddCategoryForm, 
            cname: '',
            description: ''
            })
            //   await sleep(1500);
            //   navigate('/categories/add')
            }else{
              setAlert({ type: 'danger', message: AddCategoryData.message })
                      setTimeout(() => setAlert(null), 5000)
            }
        } catch (error) {
            console.log(error)
        }
    }
    const OnchangeAdd = (event) =>{
        console.log( { AddCategoryForm} );
        setAddCategoryForm({
            ...AddCategoryForm, [event.target.name]: event.target.value
            })
            // console.log( { AddCategoryForm} );
    }
    
    return (
        <Container>
            <Row>
                <Col >
                <Card className="text-white card bg-success">
                    <Card.Header>Đăng bài viết mới</Card.Header>
                        <Card.Body style={{background:'white', color:'black'}}>
                            <Form onSubmit={AddProductSubmit}>
                                <AlertMessage info={alert} />
                                <Row className="mb-3">
                                    <Form.Group controlId="FormTitle">
                                        <Form.Label>Tên chuyên mục</Form.Label>
                                        <Form.Control 
                                            type="text" 
                                            placeholder="Tên chuyên mục" 
                                            name="cname" 
                                            value={cname} 
                                            onChange={OnchangeAdd}
                                        />
                                    </Form.Group>
                                </Row>    
                                <Row className="mb-3">
                                    <Form.Group controlId="FormDesc">
                                        <Form.Label>Mô tả ngắn <small> (25-50 ký tự)</small></Form.Label>
                                        <Form.Control 
                                            as="textarea" 
                                            rows={2} 
                                            placeholder="Tên Chuyên Mục" 
                                            name="description" 
                                            value={description} 
                                            onChange={OnchangeAdd}
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
                                            onChange={OnchangeAdd}
                                            value="CODE"
                                        />
                                        <Form.Check
                                            inline
                                            label="DOCUMENT"
                                            name="type_product"
                                            type="radio"
                                            id="DOCUMENT-radio"
                                            onChange={OnchangeAdd}
                                            value="DOCUMENT"
                                        />
                                        <Form.Check
                                            inline
                                            label="MEDIA"
                                            name="type_product"
                                            type="radio"
                                            id="MEDIA-radio"
                                            onChange={OnchangeAdd}
                                            value="MEDIA"
                                        />
                                    </Form.Group>
                                </Row>  
                                <Button variant="success" type="submit">
                                    Thêm chuyên mục
                                </Button>
                                <Link style={{float: 'right'}} to="/admin/categories/" className="btn btn-danger">
                                    Quay về
                                </Link>

                            </Form>
                        </Card.Body>
                </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default CateAdd
