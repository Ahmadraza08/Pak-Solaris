// import React, { useEffect, useState } from 'react'
// import { backendUrl } from '../App'
// import axios from 'axios'
// import { toast } from 'react-toastify'
// import { currency } from '../App'

// const List = ({token}) => {

//   const [list, setList] = useState([])

//   const fetchList = async () => {
//     try {
//       const response = await axios.get(backendUrl + '/api/product/list')
//       if (response.data.success) {
//         setList(response.data.products)
//       } else {
//         toast.error(response.data.message)
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error(error.message)
//     }
//   }

//   const removeProduct = async (id) => {
//     try {
      
//       const response = await axios.post(backendUrl + '/api/product/remove', {id}, {headers: {token}})
//       if (response.data.success) {
//         toast.success(response.data.message)
//         await fetchList()
//       } else {
//         toast.error(response.data.message)
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error(error.message)
//     }
//   }
//   useEffect(() => {
//     fetchList()
//   }, [])

//   return (
//     <>
//       <p className='mb-2'>All Products List</p>
//       <div className='flex flex-col gap-2'>

//         {/* ------------ List Table Title ------------------- */}

//         <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border border-gray-300 bg-gray-100 text-sm'>
//           <b>Image</b>
//           <b>Name</b>
//           <b>Category</b>
//           <b>Price</b>
//           <b className='text-center'>Action</b>
//         </div>

//         {/* ------------ Product List ------------------- */}

//       {
//         list.map((item,index) => (
//           <div className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border border-gray-300 bg-gray-100 text-sm' key={index}>
//             <img className='w-12' src={item.image[0]} alt="" />
//             <p>{item.name}</p>
//             <p>{item.category}</p>
//             <p>{currency}{item.price}</p>
//             <p onClick={()=>removeProduct(item._id)} className='text-right md:text-center cursor-pointer text-lg'>X</p>
//           </div>
//         ))
//       }
//       </div>
//     </>
//   )
// }

// export default List
import React, { useEffect, useState } from 'react'
import { backendUrl } from '../App'
import axios from 'axios'
import { toast } from 'react-toastify'
import { currency } from '../App'

const List = ({token}) => {

  const [list, setList] = useState([])
  // Tracks which product's price is currently being edited
  const [editingId, setEditingId] = useState(null)
  // Holds the temporary new price value during input
  const [newPrice, setNewPrice] = useState('')

  const fetchList = async () => {
    try {
      // NOTE: Yahan '/api/product/list' se hatakar 'api/product/list' kiya hai taake double slash na bane
      const response = await axios.get(backendUrl + '/api/product/list')
      if (response.data.success) {
        setList(response.data.products)
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  const removeProduct = async (id) => {
    try {
      // NOTE: Yahan bhi slash hata diya hai
      const response = await axios.post(backendUrl + 'api/product/remove', {id}, {headers: {token}})
      if (response.data.success) {
        toast.success(response.data.message)
        await fetchList()
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  // --- Update Price API Call ---
  const updatePrice = async (id) => {
    if (!newPrice || isNaN(newPrice) || parseFloat(newPrice) <= 0) {
      toast.error("Please enter a valid price")
      return
    }

    try {
      // FIX: Yahan pehle '/api/product/update-price' tha, ab 'api/product/update-price' kar diya hai
      const response = await axios.post(
        backendUrl + 'api/product/update-price', 
        { id, price: parseFloat(newPrice) }, 
        { headers: { token } }
      )
      
      if (response.data.success) {
        toast.success("Price updated successfully!")
        setEditingId(null) // Edit mode se bahar nikalne ke liye
        await fetchList()  // UI list ko refresh karne ke liye
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchList()
  }, [])

  return (
    <>
      <p className='mb-2'>All Products List</p>
      <div className='flex flex-col gap-2'>

        {/* ------------ List Table Title ------------------- */}

        <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border border-gray-300 bg-gray-100 text-sm'>
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className='text-center'>Action</b>
        </div>

        {/* ------------ Product List ------------------- */}

      {
        list.map((item,index) => (
          <div className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border border-gray-300 bg-gray-100 text-sm' key={index}>
            <img className='w-12' src={item.image[0]} alt="" />
            <p>{item.name}</p>
            <p>{item.category}</p>
            
            {/* ------------ Conditional Price Section ------------------- */}
            <div>
              {editingId === item._id ? (
                <div className='flex items-center gap-1'>
                  <span className='text-gray-500'>{currency}</span>
                  <input 
                    type="number" 
                    className='w-16 border border-gray-400 rounded px-1 py-0.5 text-xs focus:outline-none'
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value)}
                    autoFocus
                  />
                  <button onClick={() => updatePrice(item._id)} className='text-green-600 font-bold hover:text-green-800 ml-1' title="Save">✔️</button>
                  <button onClick={() => setEditingId(null)} className='text-red-500 font-bold hover:text-red-700 ml-1' title="Cancel">❌</button>
                </div>
              ) : (
                <p 
                  onClick={() => { setEditingId(item._id); setNewPrice(item.price); }} 
                  className='cursor-pointer hover:text-blue-600 underline decoration-dotted transition-all'
                  title="Click to edit price"
                >
                  {currency}{item.price} ✏️
                </p>
              )}
            </div>

            <p onClick={()=>removeProduct(item._id)} className='text-right md:text-center cursor-pointer text-lg text-red-500 hover:text-red-700 font-medium'>X</p>
          </div>
        ))
      }
      </div>
    </>
  )
}

export default List