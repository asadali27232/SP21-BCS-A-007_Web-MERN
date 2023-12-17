const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: String,
    qty: String,
    rate: String,
    gst: String,
    gstAmount: String,
    totalPrice: String,
});

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    role: String,
    password: String,
});

const invoiceSchema = new mongoose.Schema({
    invoiceNumber: String,
    date: String,
    amount: String,
    discount: String,
    amountAfterDiscount: String,
    totalGst: String,
    received: String,
    balance: String,
    totalAmount: String,
    products: [productSchema],
});

const orderSchema = new mongoose.Schema({
    invoice: invoiceSchema,
    user: userSchema,
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
