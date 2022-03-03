import {ToastContainer, Toast} from 'react-bootstrap'

const ToastMessage = ({ show }) => {
    
	return show === null ? null : (
        <ToastContainer className="p-3 position-fixed" position="top-end" >
        <Toast delay={3000} show={show._status} bg={show._style} autohide>
          <Toast.Header closeButton={false}>
           
            <strong className="me-auto">{show.title}</strong>
            
          </Toast.Header>
          <Toast.Body>{show.message}</Toast.Body>
        </Toast>
      </ToastContainer>
	)
}

export default ToastMessage