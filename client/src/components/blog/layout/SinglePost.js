import {Card, Row, Col} from 'react-bootstrap'
import { Link } from 'react-router-dom'


const SinglePost = ({ post: { _id, title, description, tags, userId, createdAt  } }) => {
 let linkblog = "/blog/"+_id
    
    return(
	<Card>
		<Card.Body>
			<Card.Title>
				<Row>
					<Col>
						<Link to={linkblog} ><p className='post-title'>{title}</p></Link>
					</Col>
				
				</Row>
			</Card.Title>
			<Card.Text>{description.slice(0, 100)}</Card.Text>
		</Card.Body>
	</Card>
)}

export default SinglePost
