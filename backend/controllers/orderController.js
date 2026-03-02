import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

// global variables
const currency = 'pkr';
const deliveryCharges = 2000;

// Placing orders using COD or manual payment method
const placeOrder = async (req, res) => {

    try {

        const { userId, items, amount, address, paymentMethod } = req.body;

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: paymentMethod || "COD", // Use the provided payment method or default to COD
            payment: paymentMethod === "manual", // Set payment to true for manual payments as they pay upfront
            status: 'order placed',
            date: Date.now()
        }

        const newOrder = new orderModel(orderData)
        await newOrder.save()

        await userModel.findByIdAndUpdate(userId, { cartData: {} })

        res.json({ success: true, message: 'Order Placed', orderId: newOrder._id })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

// All order data for admin panel
const allOrders = async (req, res) => {

    try {

        const orders = await orderModel.find()
        res.json({ success: true, orders })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// User orders data for frontend
const userOrders = async (req, res) => {

    try {

        const { userId } = req.body

        const orders = await orderModel.find({ userId })
        res.json({ success: true, orders })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// update order status from Admin panel
const updateStatus = async (req, res) => {

    try {
        const { orderId, status } = req.body;

        await orderModel.findByIdAndUpdate(orderId, { status })
        res.json({ success: true, message: 'Status updated' })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// update payment status from Admin panel
const updatePaymentStatus = async (req, res) => {
    try {
        const { orderId, payment } = req.body;

        await orderModel.findByIdAndUpdate(orderId, { payment })
        res.json({ success: true, message: 'Payment status updated' })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// update estimated delivery date from Admin panel
const updateDeliveryDate = async (req, res) => {
    try {
        const { orderId, estimatedDeliveryDate } = req.body;

        await orderModel.findByIdAndUpdate(orderId, { estimatedDeliveryDate })
        res.json({ success: true, message: 'Estimated delivery date updated' })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export { placeOrder, allOrders, userOrders, updateStatus, updatePaymentStatus, updateDeliveryDate }