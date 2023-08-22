const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  name: String,
  image: String,
  specialization: String,
  experience: String,
  location: String,
  date: String,
  slots: Number,
  fee: Number,
  userID: String
});

const AppointmentModel = mongoose.model('Appointment', appointmentSchema);

module.exports = {AppointmentModel};
