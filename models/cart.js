const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product'
            },
            quantity: {
                type: Number,
                required: true,
                min: [1, 'Quantity can not be less then 1.'],
                deafult: 1
            },
            price: {
                type: Number,
                required: true
            }
        }
    ],
    bill: {
        type: Number,
        required: true,
        default: 0
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Cart', CartSchema);
