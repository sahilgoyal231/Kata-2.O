import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['customer', 'admin'],
    default: 'customer',
  },
  refreshToken: {
    type: String,
  },
  purchaseHistory: [{
    vehicleId: mongoose.Schema.Types.ObjectId,
    make: String,
    model: String,
    price: Number,
    imageUrl: String,
    purchaseDate: { type: Date, default: Date.now }
  }]
});

export const User = mongoose.model('User', userSchema);
