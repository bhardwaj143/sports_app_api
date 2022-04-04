import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import config from "config";
import { compare } from 'bcrypt';

const { Schema, model } = mongoose;

const addressSchema = mongoose.Schema({
  kilometer_range: String,
  formattedAddress: String,
  completeAddress: String,
  floor: String,
  landmark: String,
  geo: {
    index: '2dsphere',
    type: [Number],
    default: [0, 0]
  }
}, { _id: false });

const statusSchema = mongoose.Schema({
  coachStatus: String,
  message: String
}, { _id: false });

const coachSchema = Schema({
  firstName: {
    type: String
  },
  profile_pic:{
    type: String
  },
  lastName: {
    type: String
  },
  email: {
    type: String
  },
  fullName: {
    type: String
  },
  alternative_mobile: {
    type: String
  },
  mobileNumber: {
    type: String,
  },
  achievements: {
    type: String,
  },
  year_of_experience: {
    type: String,
  },
  coachLocation: [addressSchema],
  status: [statusSchema],
  otp: {
    type: String,
  },
  Description_Strengths: {
    type: String
  },
  Upload_vaccination_certificate: {
    type: String
  },
  upload_certificates: [String],
  add_testimonials: {
    type: String
  },
  add_specialisation: {
    type: String
  },
  training_videos: {
    type: String
  },
  training_pictures: {
    type: String
  },
  spoken_language: {
    type: String,
    enum: ['ENGLISH', 'HINDI', 'TELUGU']
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  sport_category: [{ type: mongoose.Schema.ObjectId, ref: 'Categories' }],
  coach_category: {
    type: String,
    enum: ['CERTIFIED_COACH', 'INTERNATIONAL_PLAYER', 'NATIONAL_UNIVERSITY_PLAYER', 'STATE_PLAYER']
  },
  password: {
    type: String
  },
  otp: {
    type: Number
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});


coachSchema.methods.generateAuthToken = function (_id, role) {
  return jwt.sign({ id: _id, role }, config.get("privateKey"), { expiresIn: '15d' });
};

coachSchema.methods.generateRefershToken = function (_id, role) {
  return jwt.sign({ id: _id, role }, config.get("privateKey"), { expiresIn: '30d' });
};

coachSchema.methods.comparePassword = function (raw, encrypted) {
  return new Promise((resolve, reject) => {
    compare(raw, encrypted)
      .then(resolve)
      .catch(reject);
  });
};

export const Coach = model('Coach', coachSchema);
