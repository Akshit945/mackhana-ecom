const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  originalPrice: { type: Number, required: true },
  image: { type: String, required: true },
  rating: { type: Number, required: true },
  reviews: { type: Number, required: true },
  description: { type: String, required: true },
  benefits: { type: [String], required: true },
  weight: { type: String, required: true },
  quantityRemaining: { type: Number, required: true },
  nutritionFacts: {
    calories: { type: Number, required: true },
    protein: { type: String, required: true },
    carbs: { type: String, required: true },
    fat: { type: String, required: true },
    fiber: { type: String, required: true }
  }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
