import { useContext, useEffect } from 'react'
import { PostContext } from '../context/PostContext'
import {Spinner, Card, Row, Col} from 'react-bootstrap'
import SinglePost from '../layout/SinglePost'


const HomeBlog = () => {
    const {
		PostState: {post, posts, postsloading },
		getPosts,
	} = useContext(PostContext)

    useEffect(() => getPosts(), [])

	let body = null

	if (postsloading) {
		body = (
			<div className='spinner-container'>
				<Spinner animation='border' variant='info' />
			</div>
		)
	} else if (posts.length === 0) {
		body = (
			<>
				<Card className='text-center mx-5 my-5'>
					<Card.Header as='h1'>Hi </Card.Header>
					<Card.Body>
						<Card.Title>Welcome to</Card.Title>
						<Card.Text>
							Click the button below to track your first skill to learn
						</Card.Text>
					</Card.Body>
				</Card>
			</>
		)
	} else {
		body = (
			<>
				<Row className='row-cols-1 row-cols-md-3 g-4 mx-auto mt-3'>
					{posts.map(post => (
						<Col key={post._id} className='my-2'>
							<SinglePost post={post} />
						</Col>
					))}
				</Row>

				
			</>
		)
	}
    return (
        <div>
            {body}
		
        </div>
    )
}

export default HomeBlog
