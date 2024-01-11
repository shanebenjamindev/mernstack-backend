const mongoose = reqire('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    type: { type: String, required: true },
    price: { type: Boolean, default: false, required: true },
    countInStock: { type: Number, required: true },
    rating: { type: String, required: true },
    description: { type: String, required: true },
},
    {
        timestamps: true
    }
);
const Product = mongoose.model("User", productSchema);
module.exports = Product;