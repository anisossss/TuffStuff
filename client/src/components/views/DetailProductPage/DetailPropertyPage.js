import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import { Row, Col } from 'antd';
import PropertyImage from './Sections/PropertyImage';
import PropertyInfo from './Sections/PropertyInfo';
import { addToCart } from '../../../_actions/user_actions';
import { useDispatch } from 'react-redux';
function DetailPropertyPage(props) {
    const dispatch = useDispatch();
    const propertyId = props.match.params.propertyId
    const [Property, setProperty] = useState([])

    useEffect(() => {
        Axios.get(`/api/property/properties_by_id?id=${propertyId}&type=single`)
            .then(response => {
                setProperty(response.data[0])
            })

    }, [])

    const addToCartHandler = (propertyId) => {
        dispatch(addToCart(propertyId))
    }

    return (
        <div className="postPage" style={{ width: '100%', padding: '3rem 4rem' }}>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <h1>{Property.title}</h1>
            </div>

            <br />

            <Row gutter={[16, 16]} >
                <Col lg={12} xs={24}>
                    <PropertyImage detail={Property} />
                </Col>
                <Col lg={12} xs={24}>
                    <PropertyInfo
                        addToCart={addToCartHandler}
                        detail={Property} />
                </Col>
            </Row>
        </div>
    )
}

export default DetailPropertyPage
