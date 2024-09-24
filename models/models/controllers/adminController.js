const Train = require('../models/trainModel');

// Add New Train
exports.addTrain = async (req, res) => {
  try {
    const { name, source, destination, totalSeats } = req.body;
    const train = await Train.create({
      name,
      source,
      destination,
      totalSeats,
      availableSeats: totalSeats
    });
    res.status(201).json({ message: 'Train added successfully', train });
  } catch (err) {
    res.status(500).json({ message: 'Server error', err });
  }
};
