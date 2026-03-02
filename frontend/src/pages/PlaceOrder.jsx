import React, { useContext, useState } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'
import { ShopContext } from '../context/ShopContext'
import ManualPayment from '../components/ManualPayment'

const PlaceOrder = () => {
  const { navigate, backendUrl, token, cartItems, setCartItems, getCartAmount, delivery_fee, products } = useContext(ShopContext);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: ''
  });
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [orderId, setOrderId] = useState('');
  const [showManualPayment, setShowManualPayment] = useState(false);

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setFormData(data => ({ ...data, [name]: value }));
  };

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      let orderItems = [];

      for (const itemId in cartItems) {
        if (cartItems[itemId] > 0) {
          const itemInfo = structuredClone(products.find(product => product._id === itemId));
          if (itemInfo) {
            itemInfo.quantity = cartItems[itemId];
            orderItems.push(itemInfo);
          }
        }
      }

      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
        paymentMethod: paymentMethod
      };

      const responseCod = await axios.post(backendUrl + '/api/order/place', orderData, { headers: { token } });
      if (responseCod.data.success) {
        toast.success(responseCod.data.message);
        
        if (paymentMethod === 'manual') {
          // For manual payment, get order ID and show the receipt upload
          setOrderId(responseCod.data.orderId || 'ORD-' + Date.now());
          setShowManualPayment(true);
        } else {
          // For COD, clear cart and navigate to orders
          setCartItems({});
          navigate('/orders');
        }
      } else {
        toast.error(responseCod.data.message || 'Failed to place order');
      }
    } catch (error) {
      console.error('Error placing order:', error);
      toast.error(error.response?.data?.message || 'Failed to place order. Please try again.');
    }
  };

  // Payment Details Component that's shown when manual payment is selected
  const PaymentDetails = () => {
    return (
      <div className="rounded-lg bg-gradient-to-r from-gray-50 to-gray-100 shadow-sm p-5 my-5 border border-gray-200">
        <div className="border-b border-gray-200 pb-4 mb-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-1">Payment Instructions</h3>
          <p className="text-sm text-gray-600">Please transfer the exact amount and upload payment proof after placing your order</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Bank Transfer Section */}
          <div className="bg-white rounded-lg p-4 shadow-sm border-l-4 border-black hover:shadow-md transition duration-200">
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center mr-3">
                <span className="text-white font-bold text-sm">MB</span>
              </div>
              <h4 className="text-lg font-semibold">Meezan Bank</h4>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Account Title:</span>
                <span className="font-medium">SUNNY ELECTRONICS</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Account Number:</span>
                <span className="font-medium">0189-0105709390</span>
              </div>
            </div>
          </div>
          

        </div>
        
        <div className="mt-5 p-4 bg-blue-50 rounded-lg border border-blue-100">
          <h4 className="text-sm font-semibold text-blue-700 mb-2">Important Notes:</h4>
          <ul className="list-disc list-inside text-xs text-blue-600 space-y-1">
            <li>After transferring the payment, please place your order and upload a screenshot as proof</li>
            <li>Your order will be processed once the payment is verified (usually within 24 hours)</li>
            <li>Please ensure the transferred amount matches your order total exactly</li>
          </ul>
        </div>
      </div>
    );
  };

  // If showing manual payment form after order placement
  if (showManualPayment) {
    return (
      <div className="container mx-auto py-8">
        <ManualPayment 
          orderId={orderId} 
          amount={getCartAmount() + delivery_fee} 
        />
        <div className="text-center mt-6">
          <button 
            onClick={() => {
              setCartItems({});
              navigate('/orders');
            }}
            className="bg-gray-800 text-white py-2 px-6 rounded"
          >
            View Your Orders
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
      {/* left Side */}
      <div className='w-full sm:w-1/2 flex flex-col gap-4'>
        <h2 className='text-xl font-semibold'>DELIVERY INFORMATION</h2>
        <div className='flex flex-col gap-4'>
          <div className='flex flex-col sm:flex-row gap-4'>
            <input
              type="text"
              name="firstName"
              placeholder='First Name'
              required
              value={formData.firstName}
              onChange={onChangeHandler}
              className='w-full sm:w-1/2 p-2 border outline-none'
            />
            <input
              type="text"
              name="lastName"
              placeholder='Last Name'
              required
              value={formData.lastName}
              onChange={onChangeHandler}
              className='w-full sm:w-1/2 p-2 border outline-none'
            />
          </div>
          <input
            type="email"
            name="email"
            placeholder='Email'
            required
            value={formData.email}
            onChange={onChangeHandler}
            className='w-full p-2 border outline-none'
          />
          <input
            type="text"
            name="street"
            placeholder='Street Address'
            required
            value={formData.street}
            onChange={onChangeHandler}
            className='w-full p-2 border outline-none'
          />
          <input
            type="text"
            name="city"
            placeholder='City'
            required
            value={formData.city}
            onChange={onChangeHandler}
            className='w-full p-2 border outline-none'
          />
          <div className='flex flex-col sm:flex-row gap-4'>
            <input
              type="text"
              name="state"
              placeholder='State/Province'
              required
              value={formData.state}
              onChange={onChangeHandler}
              className='w-full sm:w-1/2 p-2 border outline-none'
            />
            <input
              type="text"
              name="zipcode"
              placeholder='Postal/Zip Code'
              required
              value={formData.zipcode}
              onChange={onChangeHandler}
              className='w-full sm:w-1/2 p-2 border outline-none'
            />
          </div>
          <input
            type="text"
            name="country"
            placeholder='Country'
            required
            value={formData.country}
            onChange={onChangeHandler}
            className='w-full p-2 border outline-none'
          />
          <input
            type="text"
            name="phone"
            placeholder='Phone Number'
            required
            value={formData.phone}
            onChange={onChangeHandler}
            className='w-full p-2 border outline-none'
          />
        </div>
      </div>

      {/* Right Side */}
      <div className='w-full sm:w-1/2 flex flex-col gap-4'>
        <div className='flex flex-col gap-4'>
          <h2 className='text-xl font-semibold'>CART TOTALS</h2>
          <div className='flex justify-between border-b py-2'>
            <p>Subtotal</p>
            <p>PKR {getCartAmount()}</p>
          </div>
          <div className='flex justify-between border-b py-2'>
            <p>Shipping Fee</p>
            <p>PKR {delivery_fee}</p>
          </div>
          <div className='flex justify-between py-2'>
            <p className='font-semibold'>Total</p>
            <p className='font-semibold'>PKR {getCartAmount() + delivery_fee}</p>
          </div>
          <div className='mt-4'>
            <h2 className='text-xl font-semibold'>PAYMENT METHOD</h2>
            <div className='flex flex-col gap-3'>
              <div className='flex gap-2 items-center'>
                <input
                  type="radio"
                  name="payment"
                  id="cod"
                  value="cod"
                  checked={paymentMethod === 'cod'}
                  onChange={handlePaymentMethodChange}
                />
                <label htmlFor="cod">Cash on Delivery</label>
              </div>
              <div className='flex gap-2 items-center'>
                <input
                  type="radio"
                  name="payment"
                  id="manual"
                  value="manual"
                  checked={paymentMethod === 'manual'}
                  onChange={handlePaymentMethodChange}
                />
                <label htmlFor="manual">Online Payment</label>
              </div>
            </div>
          </div>

          {/* Show payment details immediately when manual payment is selected */}
          {paymentMethod === 'manual' && <PaymentDetails />}

          <button type="submit" className='bg-black text-white py-2 px-4 w-full'>PLACE ORDER</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;