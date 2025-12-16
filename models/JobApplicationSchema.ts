import mongoose from "mongoose";

const jobApplicationSchema = new mongoose.Schema({
  company: {
    type: String,
    required: true,
  },
  applicationDate: Date,
  status: {
    type: String,
    enum: [
      'init',
      'applied',
      'interviewOffered',
      'awaitingAnswer',
      'declined'
    ],
    default: 'init'
  },
  homepage: {
    type: String,
    required: true,
  },
  motivationLetter: String,
});


export const JobApplicationModel = mongoose.models.JobApplication
  ? mongoose.models.JobApplication
  : mongoose.model('JobApplication', jobApplicationSchema);