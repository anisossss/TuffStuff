import React from 'react'

function UserCardBlock(props) {



    const renderCartImage = (images) => {
        if(images.length > 0) {
            let image = images[0]
            return `http://localhost:5000/${image}`
        }
    }

    const renderItems = () => (
        props.properties && props.properties.map(property => (
            <tr key={property._id}>
                <td>
                    <img style={{ width: '70px' }} alt="property" 
                    src={renderCartImage(property.images)} />
                </td> 
                <td>$ {property.price} </td>
                <td><button 
                onClick={()=> props.removeItem(property._id)}
                >Remove </button> </td>
            </tr>
        ))
    )


    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Property Image</th>
                        <th>Property Price</th>
                        <th>Remove from Cart</th>
                    </tr>
                </thead>
                <tbody>
                    {renderItems()}
                </tbody>
            </table>
        </div>
    )
}

export default UserCardBlock
