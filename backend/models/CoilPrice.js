import mongoose from 'mongoose';

const CoilPriceSchema = new mongoose.Schema({
  name: { type: String, required: true }, 
  details: { type: String }, 
  price: { type: Number, required: true }, 
});

export default mongoose.model('CoilPrice', CoilPriceSchema);