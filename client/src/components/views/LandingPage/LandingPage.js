import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import {  Col, Card, Row } from 'antd';
import ImageSlider from '../../utils/ImageSlider';
import CheckBox1 from './Sections/CheckBox1';
import RadioBox1 from './Sections/RadioBox1';
import CheckBox2 from './Sections/CheckBox2';
import RadioBox2 from './Sections/RadioBox2';
import { cities, price, apartments, categories } from './Sections/Datas';
import SearchFeature from './Sections/SearchFeature';

 

const { Meta } = Card;

function LandingPage() {

    const [Properties, setProperties] = useState([])
    const [Skip, setSkip] = useState(0)
    const [Limit, setLimit] = useState(8)
    const [PostSize, setPostSize] = useState()
    const [SearchTerms, setSearchTerms] = useState("")

    const [Filters, setFilters] = useState({
        city: [],
        price: [],
        apartment: [],
        category: []
    })

    useEffect(() => {

        const variables = {
            skip: Skip,
            limit: Limit,
        }

        getProperties(variables)

    }, [])

    const getProperties = (variables) => {
        Axios.post('/api/property/getProperty', variables)
            .then(response => {
                if (response.data.success) {
                    if (variables.loadMore) {
                        setProperties([...Properties, ...response.data.properties])
                    } else {
                        setProperties(response.data.properties)
                    }
                    setPostSize(response.data.postSize)
                } else {
                    alert('Failed to fectch property data...')
                }
            })
    }

    const onLoadMore = () => {
        let skip = Skip + Limit;

        const variables = {
            skip: skip,
            limit: Limit,
            loadMore: true,
            filters: Filters,
            searchTerm: SearchTerms
        }
        getProperties(variables)
        setSkip(skip)
    }


    const renderCards = Properties.map((property, index) => {

        return <Col lg={6} md={8} xs={24}>
            <Card
                hoverable={true}
                cover={<a href={`/property/${property._id}`} > <ImageSlider images={property.images} /></a>}
            >
                <Meta
                    title={property.title}
                    description={`$${property.price}`}
                />
            </Card>
        </Col>
    })


    const showFilteredResults = (filters) => {

        const variables = {
            skip: 0,
            limit: Limit,
            filters: filters

        }
        getProperties(variables)
        setSkip(0)

    }

    const handlePrice = (value) => {
        const data = price;
        let array = [];

        for (let key in data) {

            if (data[key]._id === parseInt(value, 10)) {
                array = data[key].array;
            }
        }
        console.log('array', array)
        return array
    }

    const handleFilters = (filters, category) => {

        const newFilters = { ...Filters }

        newFilters[category] = filters

        if (category === "price") {
            let priceValues = handlePrice(filters)
            newFilters[category] = priceValues

        }

        console.log(newFilters)

        showFilteredResults(newFilters)
        setFilters(newFilters)
    }

    const updateSearchTerms = (newSearchTerm) => {

        const variables = {
            skip: 0,
            limit: Limit,
            filters: Filters,
            searchTerm: newSearchTerm
        }

        
        setSkip(0)
        setSearchTerms(newSearchTerm)

        getProperties(variables)
    }

    


    return (
        <div style={{ width: '75%', margin: '3rem auto' }}>
            <div style={{ textAlign: 'center' }}>
                <h2>  Search into million pieces of Tuff Stuff
 </h2>
            </div>


            {/* Filter  */}

            <Row gutter={[16, 16]}>
                <Col lg={12} xs={24} >
                    <CheckBox1
                        list={cities}
                        handleFilters={filters => handleFilters(filters, "city")}
                    />
                </Col>
                <Col lg={12} xs={24}>
                    <RadioBox1
                        list={price}
                        handleFilters={filters => handleFilters(filters, "price")}
                    />
                </Col>
            </Row>
            <Row gutter={[16, 16]}>
                <Col lg={12} xs={24} >
                    <CheckBox2
                        list={apartments}
                        handleFilters={filters => handleFilters(filters, "apartment")}
                    />
                </Col>
                <Col lg={12} xs={24}>
                    <RadioBox2
                        list={categories}
                        handleFilters={filters => handleFilters(filters, "category")}
                    />
                </Col>
            </Row>



            {/* Search  */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', margin: '1rem auto' }}>

                <SearchFeature
                    refreshFunction={updateSearchTerms}
                />

            </div>


            


            {Properties.length === 0 ?
                <div style={{ display: 'flex', height: '300px', justifyContent: 'center', alignItems: 'center' }}>
                    <h2>No post yet...</h2>
                </div> :
                <div>
                    <Row gutter={[16, 16]}>

                        {renderCards}

                    </Row>


                </div>
            }
            <br /><br />

            {PostSize >= Limit &&
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <button onClick={onLoadMore}>Load More</button>
                </div>
            }


        </div>
    )
}

export default LandingPage
