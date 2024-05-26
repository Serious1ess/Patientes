const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const PatientSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
    required: true,
  },
  contactNumber: {
    type: String,
    required: true,
  },
  habitsAndInstincts: {
    type: String,
    required: false,
  },
  medicalHistory: {
    type: String,
    required: false,
  },
  complaint: {
    type: String,
    required: false,
  },
  diagnosis: {
    type: String,
    required: false,
  },
  testsAndImaging: {
    type: String,
    required: false,
  },
  treatment: {
    type: String,
    required: false,
  },
  reviewDate: {
    type: Date,
    required: false,
  },
  followUp: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Patient", PatientSchema);
