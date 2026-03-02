import React from 'react';

const ManualPayment = ({ orderId, amount }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-md mx-auto my-4">
      <h2 className="text-xl font-semibold mb-4">Online Payment Details</h2>
      
      {orderId && (
        <div className="mb-4">
          <p className="text-gray-700">
            <span className="font-medium">Order ID:</span> {orderId}
          </p>
          <p className="text-gray-700">
            <span className="font-medium">Amount:</span> PKR {amount}
          </p>
        </div>
      )}
    
      {/* Bank Details */}
      <div className="rounded-lg bg-gradient-to-r from-gray-50 to-gray-100 shadow-sm p-5 my-4 border border-gray-200">
        <div className="bg-white rounded-lg p-5 shadow-sm border-l-4 border-black hover:shadow-md transition duration-200">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center mr-4">
              <span className="text-white font-bold text-sm">MB</span>
            </div>
            <h4 className="text-xl font-semibold">Meezan Bank</h4>
          </div>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between border-b pb-2">
              <span className="text-gray-500">Account Title:</span>
              <span className="font-medium">SUNNY ELECTRONICS</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="text-gray-500">Account Number:</span>
              <span className="font-medium">0189-0105709390</span>
            </div>
          </div>
        </div>
      </div>  
      
      {/* Important Notes */}
      <div className="mt-6 mb-4">
        <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-500 shadow-sm">
          <h4 className="text-lg font-bold text-yellow-700 mb-2">Important!</h4>
          <ul className="space-y-3">
            <li className="flex">
              <span className="mr-2 text-yellow-600">⚠️</span>
              <span className="font-medium text-yellow-800">
                After making the payment, please send a screenshot of your payment confirmation to our WhatsApp or email (hiraelectronics38@gmail.com)
              </span>
            </li>
            <li className="flex">
              <span className="mr-2 text-yellow-600">⏱️</span>
              <span className="font-medium text-yellow-800">
                Your order will be processed once the payment is verified (usually within 24 hours)
              </span>
            </li>
          </ul>
        </div>
      </div>
      
      {/* Order ID Note */}
      <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200 text-xs text-gray-500">
        <p>Include your Order ID ({orderId || "your order ID"}) as a reference when making the payment</p>
        <p className="mt-1">For any questions, contact us at hiraelectronics38@gmail.com</p>
      </div>
    </div>
  );
};

export default ManualPayment;
