const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const PatientSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: false,
  },
  dateOfBirth: {
    type: Date,
    required: false,
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
    required: false,
  },
  contactNumber: {
    type: String,
    required: false,
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
