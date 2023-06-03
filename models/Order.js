const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const PaymentSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    product: { type: Schema.Types.ObjectId, ref: 'product', required: true },
    quantity: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    status: { type: String, required: true, default: 'Pending' },
    date: { type: Date, default: Date.now },
    paymentMethod: { type: String, required: true, default: 'Paypal' },
    shippingMethod: { type: String, required: true, default: 'Free' },
    paymentStatus: { type: String, required: true, default: 'Pending' },
});

const Payment = mongoose.model('Payment', PaymentSchema);

const orderSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	address: {
		type: String,
		required: true
	},
	cart: {
		type: [{
			product: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'product'
			},
			quantity: {
				type: Number,
				required: true
			}
		}],
		required: true
	},
	date: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model('Order', orderSchema);
module.exports = {
Payment: Payment,

};
function newFunction() {
return require('mongoose');
}

const nodemailer = require('nodemailer');
const Order = require('../models/Order');

const transporter = nodemailer.createTransport({
	service: 'Gmail',
	auth: {
		user: process.env.EMAIL_USER,
		pass: process.env.EMAIL_PASS
	}
});

const sendConfirmationEmail = async (order) => {
	try {
	const info = await transporter.sendMail({
		from: 'My E-commerce Website <noreply@myecommercewebsite.com>',
		to: order.email,
		subject: 'Order Confirmation',
		html: `
		<p>Thank you for your order!</p>
		<p>Here is a summary of your order:</p>
		<ul>
			${order.cart.map(item => `<li>${item.product.name} x${item.quantity} - ${item.product.price * item.quantity}</li>`).join('')}
		</ul>
		  <p>Total: ${order.cart.reduce((total, item) => total + item.product.price * item.quantity, 0)}</p>
		<p>Shipping address:</p>
		<p>${order.name}</p>
		<p>${order.address}</p>
		`,
	});
	console.log(`Confirmation email sent to ${order.email}: ${info.messageId}`);
	} catch (err) {
		console.error(`Error sending confirmation email to ${order.email}: ${err}`);
	}
};

module.exports = {
	sendConfirmationEmail
};
