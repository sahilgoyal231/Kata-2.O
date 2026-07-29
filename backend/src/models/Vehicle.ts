import mongoose from 'mongoose';

const vehicleSchema = new mongoose.Schema({
  make: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  powertrain: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: 'A masterpiece of modern automotive engineering.',
  },
  horsepower: {
    type: String,
    default: 'N/A',
  },
  zeroToSixty: {
    type: String,
    default: 'N/A',
  },
  topSpeed: {
    type: String,
    default: 'N/A',
  },
  year: {
    type: Number,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 0,
  },
});

export const Vehicle = mongoose.model('Vehicle', vehicleSchema);
