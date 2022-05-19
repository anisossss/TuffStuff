import React, { useEffect, useState } from 'react'
import { Button, Descriptions } from 'antd';

function PropertyInfo(props) {

    const [Property, setProperty] = useState({})

    useEffect(() => {

        setProperty(props.detail)

    }, [props.detail])

    const addToCarthandler = () => {
        props.addToCart(props.detail._id)
    }


    return (
        <div>
            <Descriptions title="Property Info">
                <Descriptions.Item label="Price"> {Property.price}</Descriptions.Item>
                <Descriptions.Item label="Sold">{Property.sold}</Descriptions.Item>
                <Descriptions.Item label="View"> {Property.views}</Descriptions.Item>
                <Descriptions.Item label="Description"> {Property.description}</Descriptions.Item>
            </Descriptions>   
            <Descriptions>
                <Descriptions.Item label="Address"> {Property.address}</Descriptions.Item>
            </Descriptions>

            <br />
            <br />
            <br />
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button size="large" shape="round" type="danger"
                    onClick={addToCarthandler}
                >
                    Add to Cart
                    </Button>
            </div>
        </div>
    )
}

export default PropertyInfo
