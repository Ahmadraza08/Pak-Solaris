import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import ProductItem from './ProductItem'
import { useParams } from 'react-router-dom'

const RelatedProducts = ({ category }) => {
    const { products } = useContext(ShopContext)
    const [related, setRelated] = useState([])
    const { productID } = useParams() // Get the current product ID from URL params

    useEffect(() => {
        if (products.length > 0) {
            // Filter products by category and exclude the current product
            let productsCopy = products.filter(item => 
                item.category === category && item._id !== productID
            );

            // Shuffle the products
            productsCopy = productsCopy.sort(() => Math.random() - 0.5);
            
            // Take up to 5 products for display
            setRelated(productsCopy.slice(0, 5))
        }
    }, [products, category, productID])

    return (
        <div className='my-24'>
            <div className="text-center text-3xl py-2">
                <Title text1={'RELATED'} text2={"PRODUCTS"} />
            </div>

            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gy6'>
                {
                    related.length > 0 ? (
                        related.map((item, index) => (
                            <div key={item._id}>
                                <ProductItem id={item._id} name={item.name} price={item.price} image={item.image} />
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full text-center text-gray-500 py-4">
                            No related products found
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default RelatedProducts