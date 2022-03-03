import { useContext, useEffect } from 'react'
import { PostContext } from '../context/PostContext'
import {Spinner, Card, Row, Col, Container, Badge, Button} from 'react-bootstrap'
import DataTable from 'react-data-table-component'
import moment from 'moment'
import { Link } from 'react-router-dom'
import ActionButtons from './ActionButtons'
import UserInfo from '../../profile/UserInfo'

const BlogAll = () => {
    const {
		PostState: {posts, postsloading },
		getMyPost
	} = useContext(PostContext)
  
    useEffect(() => getMyPost(), [])
    let i=0
    let body
    
    const columns = [
        {
            name: 'STT',
            selector: row =>  posts.findIndex( s => s._id == row._id ),
            sortable: true,
        },
        {
            name: 'Tên Bài Viết',
            selector: row => row.title ,
            sortable: true,
        },
        {
            name: 'Ngày đăng',
            selector: row => (<>
                <Badge bg="danger">{moment(row.createdAt).format("d/M/YYYY ")}</Badge>{' '}
                <Badge bg="secondary"> {moment(row.createdAt).format("HH:mm")}</Badge>
              
               </>)  ,
            // sortable: true,
        },
        {
            name: 'Ngày Cập nhật',
            selector: row => (<>
             <Badge bg="success">{moment(row.updatedAt).format("d/M/YYYY ")}</Badge>{' '}
             <Badge bg="secondary"> {moment(row.updatedAt).format("HH:mm")}</Badge>
           
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
            name: 'Tags',
            selector: row =>(<>{(row.tags).map(
                tag => (<div key={"tag-" +row._id+"-"+tag}><Badge  bg="secondary">{tag}</Badge><br/></div>)
            )}</>),
            // sortable: true,
        },
        {
            name: 'Hành Động',
            selector: row => (
                <>
               	<ActionButtons _id={row._id} />
                </>
            )
        },

    ]

    if (postsloading) {
		body = (
			<div className='spinner-container'>
				<Spinner animation='border' variant='info' />
			</div>
		)
	} else {
		body = (
			<>
            <Container>
            <Row>
                <Col md="3">
                <UserInfo localtion="2" />
                </Col>
                <Col md="9">
                    <Card>
                        <Card.Body>
                        <DataTable title="Danh sách bài đăng của bạn" keyField='_id' columns={columns}  data={posts} pagination />
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

export default BlogAll
