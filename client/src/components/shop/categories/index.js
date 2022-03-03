import { useContext, useEffect } from 'react'
import {Spinner, Card, Row, Col} from 'react-bootstrap'
import { CateContext } from './cateContext'
const Categories = () => {
    const {
        CateState: {categories, cateloading },
        GetCategories,
    } = useContext(CateContext)

    useEffect(() => GetCategories(), [])
    let body
    if (cateloading) {
		body = (
			<div className='spinner-container'>
				<Spinner animation='border' variant='info' />
			</div>
		)

    }else{
        body = (
			<>
				<Row className='row-cols-1 row-cols-md-3 g-4 mx-auto mt-3'>
					{categories.map(cate => (
						cate.cname
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

export default Categories
