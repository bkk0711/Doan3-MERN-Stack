
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
    Button} from 'react-bootstrap'
    
const AdminCash = () => {
    return (
        <Container>
            <Row>
                <Col md="3">
                        <AdminMenu localtion="6"/>
                </Col>
                <Col md="9">
               
                            <Row>
                                <Col md="6">
                                    <Card bg="success" className="text-white">
                                    <Card.Header>Nạp trong ngày</Card.Header>
                                    <ListGroup variant="flush">

                                    <ListGroup.Item><center><h4>10,000 <small><small> VNĐ</small></small></h4></center></ListGroup.Item>
                                    
                                    </ListGroup>
                                    </Card>
                                </Col>
                                <Col md="6">
                                    <Card bg="success" className="text-white">
                                    <Card.Header>Rút trong ngày</Card.Header>
                                    <ListGroup variant="flush">

                                    <ListGroup.Item><center><h4>200,000 <small><small> VNĐ</small></small></h4></center></ListGroup.Item>
                                    
                                    </ListGroup>
                                    </Card>
                                </Col>
                                
                                

                            </Row>

                    </Col>

           
            </Row>
            
        </Container>
    )
}

export default AdminCash
