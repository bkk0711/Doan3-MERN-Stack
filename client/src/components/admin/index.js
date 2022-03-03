
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

const AdminPage = () => {
    
    return (
        <Container>
            <Row>
                <Col md="3">
                        <AdminMenu localtion="0"/>
                </Col>
                <Col md="9">
                <Row>
                                <Col md="3">
                                    <Card bg="success" className="text-white">
                                    <Card.Header>Số sản phẩm</Card.Header>
                                    <ListGroup variant="flush">

                                    <ListGroup.Item><center><h4>56</h4></center></ListGroup.Item>
                                    
                                    </ListGroup>
                                    </Card>
                                </Col>
                                <Col md="3">
                                    <Card bg="success" className="text-white">
                                    <Card.Header>Số bài đăng</Card.Header>
                                    <ListGroup variant="flush">

                                    <ListGroup.Item><center><h4>22</h4></center></ListGroup.Item>
                                    
                                    </ListGroup>
                                    </Card>
                                </Col>
                                
                                <Col md="3">
                                    <Card bg="success" className="text-white">
                                    <Card.Header>Số thành viên</Card.Header>
                                    <ListGroup variant="flush">

                                    <ListGroup.Item><center><h4>20</h4></center></ListGroup.Item>
                                    
                                    </ListGroup>
                                    </Card>
                                </Col>

                                <Col md="3">
                                    <Card bg="success" className="text-white">
                                    <Card.Header>Số lượt mua</Card.Header>
                                    <ListGroup variant="flush">

                                    <ListGroup.Item><center><h4>70<small><small></small></small></h4></center></ListGroup.Item>
                                    
                                    </ListGroup>
                                    </Card>
                                </Col>

                            </Row>
<hr/>
                            <Row>
                                <Col md="3">
                                    <Card bg="success" className="text-white">
                                    <Card.Header>Doanh thu ngày</Card.Header>
                                    <ListGroup variant="flush">

                                    <ListGroup.Item><center><h4>700,000 <small><small> VNĐ</small></small></h4></center></ListGroup.Item>
                                    
                                    </ListGroup>
                                    </Card>
                                </Col>
                                <Col md="3">
                                    <Card bg="success" className="text-white">
                                    <Card.Header>Doanh thu tuần</Card.Header>
                                    <ListGroup variant="flush">

                                    <ListGroup.Item><center><h4>22,705,000 <small><small> VNĐ</small></small></h4></center></ListGroup.Item>
                                    
                                    </ListGroup>
                                    </Card>
                                </Col>
                                
                                <Col md="3">
                                    <Card bg="success" className="text-white">
                                    <Card.Header>Tổng doanh thu</Card.Header>
                                    <ListGroup variant="flush">

                                    <ListGroup.Item><center><h4>23,405,000 <small><small> VNĐ</small></small></h4></center></ListGroup.Item>
                                    
                                    </ListGroup>
                                    </Card>
                                </Col>

                                <Col md="3">
                                    <Card bg="success" className="text-white">
                                    <Card.Header>Tổng số dư thành viên</Card.Header>
                                    <ListGroup variant="flush">

                                    <ListGroup.Item><center><h4>562,236,412<small><small> VNĐ</small></small></h4></center></ListGroup.Item>
                                    
                                    </ListGroup>
                                    </Card>
                                </Col>

                            </Row>

                    </Col>

           
            </Row>
            
        </Container>
          
    )
}

export default AdminPage
