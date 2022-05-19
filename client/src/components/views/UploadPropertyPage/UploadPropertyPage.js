import React, { useState } from 'react'
import { Typography, Button, Form, message, Input, Icon } from 'antd';
import FileUpload from '../../utils/FileUpload'
import Axios from 'axios';

const { Title } = Typography;
const { TextArea } = Input;

const Apartments = [
    { key: 1, value: "1 BHK" },
    { key: 2, value: "2 BHK" },
    { key: 3, value: "3 BHK" },
    { key: 4, value: "1 RK" },
    { key: 5, value: "House" },
]

const Categories = [
    { key: 1, value: "Sell" },
    { key: 2, value: "Rent" }
]

const Cities = [
    { key: 1, value: "Mumbai" },
    { key: 2, value: "Thane" },
    { key: 3, value: "Pune" },
    { key: 4, value: "Nashik" }
]

const States = [
    { key: 1, value: "Maharashtra" },
    { key: 2, value: "Gujarat" },
    { key: 3, value: "Karnatak" },
    { key: 4, value: "Goa" }
]

function UploadPropertyPage(props) {

    const [TitleValue, setTitleValue] = useState("")
    const [DescriptionValue, setDescriptionValue] = useState("")
    const [PriceValue, setPriceValue] = useState(0)
    const [ApartmentValue, setApartmentValue] = useState(1)
    const [CategoryValue, setCategoryValue] = useState(1)
    const [AddressValue, setAddressValue] = useState("")
    const [CityValue, setCityValue] = useState(1)
    const [StateValue, setStateValue] = useState(1)
    const [PincodeValue, setPincodeValue] = useState(0)

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

    const onApartmentChange = (event) => {
        setApartmentValue(event.currentTarget.value)
    }

    const onCategoryChange = (event) => {
        setCategoryValue(event.currentTarget.value)
    }

    const onAddressChange = (event) => {
        setAddressValue(event.currentTarget.value)
    }

    const onPincodeChange = (event) => {
        setPincodeValue(event.currentTarget.value)
    }

    const onCitiesSelectChange = (event) => {
        setCityValue(event.currentTarget.value)
    }

    const onStatesSelectChange = (event) => {
        setStateValue(event.currentTarget.value)
    }

    const updateImages = (newImages) => {
        setImages(newImages)
    }
    const onSubmit = (event) => {
        event.preventDefault();


        if (!TitleValue || !DescriptionValue || !PriceValue ||
            !ApartmentValue || !CategoryValue ||!AddressValue ||!CityValue ||!StateValue || !PincodeValue || !Images) {
            return alert('fill all the fields first!')
        }

        const variables = {
            writer: props.user.userData._id,
            title: TitleValue,
            description: DescriptionValue,
            price: PriceValue,
            apartment: ApartmentValue,
            category: CategoryValue,
            images: Images,
            address: AddressValue,
            city: CityValue,
            state: StateValue,
            pincode: PincodeValue
        }

        Axios.post('/api/property/uploadProperty', variables)
            .then(response => {
                if (response.data.success) {
                    alert('Property Successfully Uploaded')
                    props.history.push('/')
                } else {
                    alert('Failed to upload Property')
                }
            })

    }

    return (
        <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <Title level={2}> Upload Your Real Estate</Title>
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
                        <label style={{paddingTop: '10px'}}>Layout</label>
                        <br />
                        <select onChange={onApartmentChange} value={ApartmentValue} style={{width : '200px', height: '40px', border: '1px solid lightgray', borderRadius: '5px'}}>
                            {Apartments.map(item => (
                                <option key={item.key} value={item.key}>{item.value} </option>
                            ))}
                        </select>

                    </div>

                    <div>
                        <label style={{paddingTop: '10px'}}>Category</label>
                        <br />
                        <select onChange={onCategoryChange} value={CategoryValue} style={{width : '200px', height: '40px', border: '1px solid lightgray', borderRadius: '5px'}}>
                            {Categories.map(item => (
                                <option key={item.key} value={item.key}>{item.value} </option>
                            ))}
                        </select>

                    </div>

                </div>

                
                <br /><br />

                <label>Address</label>
                <TextArea
                    onChange={onAddressChange}
                    value={AddressValue}
                />

                <br /><br />

                <div style={{ display: 'flex',justifyContent: 'space-between' }}>

                    <div>
                        <label style={{paddingTop: '10px'}}>City</label>
                        <br />
                        <select onChange={onCitiesSelectChange} value={CityValue} style={{width : '200px', height: '40px', border: '1px solid lightgray', borderRadius: '5px'}}>
                            {Cities.map(item => (
                                <option key={item.key} value={item.key}>{item.value} </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label style={{paddingTop: '10px'}}>State</label>
                         <br />
                        <select onChange={onStatesSelectChange} value={StateValue} style={{width : '200px', height: '40px', border: '1px solid lightgray', borderRadius: '5px'}}>
                            {States.map(item => (
                                <option key={item.key} value={item.key}>{item.value} </option>
                            ))}
                        </select>

                    </div>

                    <div>
                        <label style={{paddingTop: '10px'}}>Pincode</label>
                        <br />
                        <input style={{width : '200px', height: '40px', border: '1px solid lightgray', borderRadius: '5px' }}
                        onChange={onPincodeChange}
                        value={PincodeValue}
                        type="number"
                        />
                    </div>

                </div>

                

                <br />
                <br />

                <Button
                    onClick={onSubmit}
                >
                    Submit
                </Button>

            </Form>

        </div>
    )
}

export default UploadPropertyPage
