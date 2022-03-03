import Button from 'react-bootstrap/Button'
import { useContext } from 'react'
import { PostContext } from '../context/PostContext'
import { useNavigate } from 'react-router-dom'

const ActionButtons = ({ _id }) => {
    const { deletePost, findPost, setShowUpdatePostModal } = useContext(
		PostContext
	)
        let Navigate = useNavigate()
	const choosePost = postId => {
		findPost(postId)
		// setShowUpdatePostModal(true)
        Navigate('/blog/edit/'+ _id)
	}

    const DelPost = postId => {
		deletePost(postId)
		// setShowUpdatePostModal(true)
        Navigate('/blog/all')
	}

    return (
		<>
			<Button variant="warning" size="sm" onClick={choosePost.bind(this, _id)}>Sửa </Button>
                 {' '}
            <Button variant="danger" size="sm" onClick={DelPost.bind(this, _id)}> Xoá </Button>
			
		</>
	)
}

export default ActionButtons
