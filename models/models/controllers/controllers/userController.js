const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const Train = require('../models/trainModel');
const Booking = require('../models/bookingModel');

// User Registration
exports.registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, password: hashedPassword });
    res.status(201).json({ message: 'User registered successfully', user });
  } catch (err) {
    res.status(500).json({ message: 'Server error', err });
  }
};

// User Login
exports.loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ message: 'Login successful', token });
  } catch (err) {
    res.status(500).json({ message: 'Server error', err });
  }
};

// Get Seat Availability
exports.getSeatAvailability = async (req, res) => {
  try {
    const { source, destination } = req.body;
    const trains = await Train.findAll({ where: { source, destination } });
    res.json(trains);
  } catch (err) {
    res.status(500).json({ message: 'Server error', err });
  }
};

// Book Seat (Handle race conditions)
exports.bookSeat = async (req, res) => {
  try {
    const { trainId, userId } = req.body;
    const train = await Train.findByPk(trainId);

    if (train.availableSeats <= 0) {
      return res.status(400).json({ message: 'No seats available' });
    }

    // Decrement seat count and book the seat
    await train.decrement('availableSeats', { by: 1 });
    const booking = await Booking.create({ userId, trainId, seatNumber: train.totalSeats - train.availableSeats });
    res.json({ message: 'Seat booked successfully', booking });
  } catch (err) {
    res.status(500).json({ message: 'Server error', err });
  }
};
