import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import config from "config";
import { hash, compare } from 'bcrypt';

const { Schema, model } = mongoose;

const addressSchema = mongoose.Schema({
  formattedAddress: String,
  geo: {
    index: '2dsphere',
    type: [Number],
    default: [0, 0]
  }
}, { _id: false });

const coachSchema = Schema({
  profile_pic : {
    type: String, 
     required: false
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  fullName: {
    type: String
  },
  mobileNumber: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  achievements: {
    type: String,
  },
  year_of_experience: {
    type: String,
  },
  year_of_experience: {
    type: String,
  },
  coachLocation: [addressSchema],
  otp: {
    type: String,
  },
  Description_Strengths: {
    type: String
  },
  Upload_vaccination_certificate: {
    type: String
  },
  upload_certificates: {
    type: String
  },
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
  isVerified: {
    type: Boolean,
    default: false
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
