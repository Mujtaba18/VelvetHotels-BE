const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    booking_id: { type: mongoose.Schema.Types.ObjectId, required: true, unique: true },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    hotel_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Hotel', required: true }, 
    checkInDate: { type: Date, required: true },
    checkOutDate: { type: Date, required: true },
    numberOfGuests: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    bookingStatus: { type: String, enum: ['confirmed', 'canceled'], default: 'confirmed' }
});

module.exports = mongoose.model('Booking', bookingSchema);
