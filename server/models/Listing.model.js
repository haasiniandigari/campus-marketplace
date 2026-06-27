const mongoose = require('mongoose')

const listingSchema = new mongoose.Schema({
  title:       { type: String, required: true },
  description: { type: String },
  price:       { type: Number, required: true },
  category:    { type: String, required: true, enum: ['Textbooks','Gadgets','Hostel Essentials','Apparel','Instruments','Lab Gear','Furniture','Electronics','Other'] },
  condition:   { type: String, required: true, enum: ['Brand New','Like New','Good','Fair','For Parts'] },
  image:       { type: String },
  seller:      { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  isSold:      { type: Boolean, default: false },
}, { timestamps: true })

module.exports = mongoose.model('Listing', listingSchema)