const mongoose = require("mongoose");
const { Schema } = mongoose;

// Define the Patient schema
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

// Virtual for formatted date
PatientSchema.virtual("formattedDateOfBirth").get(function () {
  return this.dateOfBirth ? this.dateOfBirth.toLocaleDateString("en-GB") : "";
});

PatientSchema.virtual("formattedReviewDate").get(function () {
  return this.reviewDate ? this.reviewDate.toLocaleDateString("en-GB") : "";
});

PatientSchema.virtual("formattedCreatedAt").get(function () {
  return this.createdAt ? this.createdAt.toLocaleDateString("en-GB") : "";
});

PatientSchema.virtual("formattedUpdatedAt").get(function () {
  return this.updatedAt ? this.updatedAt.toLocaleDateString("en-GB") : "";
});
PatientSchema.virtual("translatedGender").get(function () {
  if (this.gender == "Male") return (this.gender = "ذكر");
  if (this.gender == "Female") return (this.gender = "انثى");
  if (this.gender == "Other") return (this.gender = "اخر");
});

// Ensure virtual fields are included in JSON output
PatientSchema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("Patient", PatientSchema);
