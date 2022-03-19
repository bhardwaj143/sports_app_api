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

const studentSchema = Schema({
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  fullName: {
    type: String
  },
  mobileNumber: {
    type: String,
  },
  gender: {
    type: String,
  },
  email: {
    type: String,
  },
  studentProfil_pic: {
    type: String,
  },
  preferredSuports: {
    type: String
  },
  studentLocation: [addressSchema],
  sportCategory: {
    type: String
  },
  profile_pic: {
    type: String
  },
  uploadDocuments: {
    type: String
  },
  otp: {
    type: String,
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


studentSchema.methods.generateAuthToken = function (_id, role) {
  return jwt.sign({ id: _id, role }, config.get("privateKey"), { expiresIn: '15d' });
};

studentSchema.methods.generateRefershToken = function (_id, role) {
  return jwt.sign({ id: _id, role }, config.get("privateKey"), { expiresIn: '30d' });
};

studentSchema.methods.comparePassword = function (raw, encrypted) {
  return new Promise((resolve, reject) => {
    compare(raw, encrypted)
      .then(resolve)
      .catch(reject);
  });
};

export const Stundent = model('Student', studentSchema);
