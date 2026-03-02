import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { backendUrl, currency } from '../App';
import { toast } from 'react-toastify';
import { assets } from '../assets/assets';

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);
  const [similarProducts, setSimilarProducts] = useState({});
  const [deliveryDates, setDeliveryDates] = useState({});

  const fetchAllOrders = async () => {
    if (!token) return null;

    try {
      const response = await axios.post(backendUrl + '/api/order/list', {}, { headers: { token } });
      if (response.data.success) {
        setOrders(response.data.orders);
        
        // Initialize delivery dates from fetched orders
        const dates = {};
        response.data.orders.forEach(order => {
          dates[order._id] = order.estimatedDeliveryDate || '';
        });
        setDeliveryDates(dates);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const fetchSimilarProducts = async (category, orderId) => {
    try {
      const response = await axios.get(`${backendUrl}/api/products/similar?category=${category}`);
      if (response.data.success) {
        setSimilarProducts((prev) => ({ ...prev, [orderId]: response.data.products }));
      }
    } catch (error) {
      console.error('Error fetching similar products:', error);
    }
  };

  const statusHandler = async (event, orderId, category) => {
    try {
      const newStatus = event.target.value;
      const response = await axios.post(
        backendUrl + '/api/order/status',
        { orderId, status: newStatus },
        { headers: { token } }
      );

      if (response.data.success) {
        await fetchAllOrders();

        // If the product is out of stock, fetch similar products
        if (newStatus === 'out of stock') {
          fetchSimilarProducts(category, orderId);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // Handler for updating payment status
  const paymentStatusHandler = async (event, orderId) => {
    try {
      const newPaymentStatus = event.target.value === "true"; // Convert string to boolean
      
      const response = await axios.post(
        backendUrl + '/api/order/payment-status',
        { orderId, payment: newPaymentStatus },
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success("Payment status updated successfully");
        await fetchAllOrders();
      } else {
        toast.error(response.data.message || "Failed to update payment status");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message || "An error occurred while updating payment status");
    }
  };

  // Handler for updating delivery date
  const handleDeliveryDateChange = (e, orderId) => {
    setDeliveryDates({
      ...deliveryDates,
      [orderId]: e.target.value
    });
  };

  const updateDeliveryDate = async (orderId) => {
    try {
      const estimatedDeliveryDate = deliveryDates[orderId];
      
      const response = await axios.post(
        backendUrl + '/api/order/delivery-date',
        { orderId, estimatedDeliveryDate },
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success("Delivery date updated successfully");
        await fetchAllOrders();
      } else {
        toast.error(response.data.message || "Failed to update delivery date");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message || "An error occurred while updating delivery date");
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div>
      <h3>Order Page</h3>
      <div>
        {orders.map((order, index) => (
          <div
            key={index}
            className='grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] items-center gap-3 border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700'
          >
            <div className="flex justify-center">
              {order.items[0]?.image && order.items[0]?.image[0] ? (
                <img 
                  className='w-16 h-16 object-cover rounded border border-gray-300' 
                  src={order.items[0].image[0]} 
                  alt={order.items[0].name} 
                />
              ) : (
                <img className='w-12' src={assets.parcel_icon} alt='Parcel' />
              )}
            </div>
            <div>
              <div>
                {order.items.map((item, idx) => (
                  <p key={idx} className="py-1">
                    {item.name} x {item.quantity}
                  </p>
                ))}
              </div>
              <p className='mt-3 mb-2 font-medium'>{order.address.firstName + ' ' + order.address.lastName}</p>
              <div>
                <p>{order.address.street + ','}</p>
                <p>
                  {order.address.city + ',' + order.address.state + ',' + order.address.country + ',' + order.address.zipcode}
                </p>
              </div>
              <p>{order.address.phone}</p>
            </div>
            <div>
              <p className='text-sm sm:text-[15px]'>Items: {order.items.length}</p>
              <p className='mt-3'>Method: {order.paymentMethod}</p>
              <div className="flex items-center gap-2">
                <p>Payment: </p>
                <select
                  onChange={(event) => paymentStatusHandler(event, order._id)}
                  value={order.payment.toString()}
                  className='p-1 font-semibold border border-gray-300 rounded'
                >
                  <option value="false">Pending</option>
                  <option value="true">Completed</option>
                </select>
              </div>
              <p>Date: {new Date(order.date).toLocaleDateString()}</p>
              <div className="mt-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Estimated Delivery Date:</label>
                <div className="flex items-center">
                  <input
                    type="date"
                    value={deliveryDates[order._id] || ''}
                    onChange={(e) => handleDeliveryDateChange(e, order._id)}
                    className="p-1 border border-gray-300 rounded mr-2"
                  />
                  <button 
                    onClick={() => updateDeliveryDate(order._id)}
                    className="bg-blue-500 text-white px-2 py-1 rounded text-xs hover:bg-blue-600"
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
            <p className='text-sm sm:text-[15px]'>{currency}{order.amount}</p>
            <select
              onChange={(event) => statusHandler(event, order._id, order.items[0]?.category)}
              value={order.status}
              className='p-2 font-semibold'
            >
              <option value='pending'>Order Placed</option>
              <option value='shipped'>Shipped</option>
              <option value='out for delivery'>Out for delivery</option>
              <option value='delivered'>Delivered</option>
              <option value='out of stock'>Out of Stock</option>
              <option value='order cancelled'>Order Cancelled</option>
            </select>

            {/* Show similar products if out of stock */}
            {order.status === 'out of stock' && similarProducts[order._id] && (
              <div className='mt-4 p-3 border border-gray-300 rounded-md'>
                <p className='font-medium'>Similar Products:</p>
                <div className='flex gap-2 overflow-x-auto'>
                  {similarProducts[order._id].map((product) => (
                    <div key={product._id} className='min-w-[120px] p-2 border rounded'>
                      <img src={product.image} alt={product.name} className='w-full h-16 object-cover' />
                      <p className='text-sm mt-1'>{product.name}</p>
                      <p className='text-sm font-semibold'>{currency}{product.price}</p>
                      <button className='mt-1 bg-blue-500 text-white px-2 py-1 text-xs rounded'>View</button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
