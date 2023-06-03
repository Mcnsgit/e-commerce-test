const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const productSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	price: {
		type: Number,
		required: true
	},
	imageUrl: {
		type: String,
		required: true
	},
	category: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
});

module.exports = mongoose.model('product', productSchema);

const product = mongoose.model('product', productSchema);
module.exports = product;