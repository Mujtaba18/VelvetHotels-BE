const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    hotel: { type: mongoose.Schema.Types.ObjectId, ref: 'Hotel', required: true }, 
    checkInDate: { type: Date, required: true },
    checkOutDate: { type: Date, required: true },
    numberOfGuests: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    bookingStatus: { type: String, enum: ['confirmed', 'canceled'], default: 'confirmed' }
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
