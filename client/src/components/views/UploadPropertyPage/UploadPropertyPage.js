import React, { useState } from 'react'
import { Typography, Button, Form, message, Input, Icon } from 'antd';
import FileUpload from '../../utils/FileUpload'
import Axios from 'axios';

const { Title } = Typography;
const { TextArea } = Input;


const Categories = [
    { key: 1, value: "Sell" },
    { key: 2, value: "Rent" }
]



function UploadpropertyPage(props) {

    const [TitleValue, setTitleValue] = useState("")
    const [DescriptionValue, setDescriptionValue] = useState("")
    const [PriceValue, setPriceValue] = useState(0)

    const [CategoryValue, setCategoryValue] = useState(1)
    const [AddressValue, setAddressValue] = useState("")
    const [StateValue, setStateValue] = useState(1)

    const [Images, setImages] = useState([])


    const onTitleChange = (event) => {
        setTitleValue(event.currentTarget.value)
    }

    const onDescriptionChange = (event) => {
        setDescriptionValue(event.currentTarget.value)
    }

    const onPriceChange = (event) => {
        setPriceValue(event.currentTarget.value)
    }

    const onCategoryChange = (event) => {
        setCategoryValue(event.currentTarget.value)
    }



    const updateImages = (newImages) => {
        setImages(newImages)
    }
    const onSubmit = (event) => {
        event.preventDefault();


        if (!TitleValue || !DescriptionValue || !PriceValue ||
        !CategoryValue ||!AddressValue  ||!StateValue  || !Images) {
            return alert('fill all the fields first!')
        }

        const variables = {
            writer: props.user.userData._id,
            title: TitleValue,
            description: DescriptionValue,
            price: PriceValue,
            category: CategoryValue,
            images: Images,
      
        }

        Axios.post('/api/property/uploadproperty', variables)
            .then(response => {
                if (response.data.success) {
                    alert('property Successfully Uploaded')
                    props.history.push('/')
                } else {
                    alert('Failed to upload property')
                }
            })

    }

    return (
        <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <Title level={2}> Upload Your product</Title>
            </div>


            <Form onSubmit={onSubmit} >

                {/* DropZone */}
                <FileUpload refreshFunction={updateImages} />

                <br />
                <br />
                <label>Title</label>
                <Input
                    onChange={onTitleChange}
                    value={TitleValue}
                />
                <br />
                <br />
                <label>Description</label>
                <TextArea
                    onChange={onDescriptionChange}
                    value={DescriptionValue}
                />
                <br />
                <br />

                <div style={{ display: 'flex',justifyContent: 'space-between' }}>

                    <div>
                        <label>Price($)</label>
                        <Input
                            onChange={onPriceChange}
                            value={PriceValue}
                            type="number"
                        />
                    </div>

                  

                    <div>
                        <label style={{paddingTop: '10px'}}>Category</label>
                        <br />
                        <select onChange={onCategoryChange} value={CategoryValue} style={{width : '200px', height: '40px', border: '1px solid lightgray', borderRadius: '5px'}}>
                            {Categories.map(property => (
                                <option key={property.key} value={property.key}>{property.value} </option>
                            ))}
                        </select>

                    </div>

                </div>

                
                <br /><br />

                <Button
                    onClick={onSubmit}
                >
                    Submit
                </Button>

            </Form>

        </div>
    )
}

export default UploadpropertyPage
