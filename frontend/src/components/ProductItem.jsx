import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom'

const ProductItem = ({id,image,name,price}) => {

    const { currency } = useContext(ShopContext);
    
    const handleClick = () => {
        window.scrollTo(0, 0);
    };
    
  return (
    <div>
        <Link 
            className='text-gray-700 cursor-pointer' 
            to={`/product/${id}`} 
            onClick={handleClick}
        >
            <div className='overflow-hidden rounded-2xl'>
                <img className='hover:scale-110 transition ease-in-out' src={image[0]} alt="" />
            </div>
            <p className='pt-3 pb-1 text-sm'>{name}</p>
            <p className='font-medium text-sm'>{currency}{price}</p>
        </Link>

    </div>
  )
}

export default ProductItem