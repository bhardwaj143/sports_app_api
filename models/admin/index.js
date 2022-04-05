import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import config from "config";
import { privateKey } from '../../config/privateKeys.js';

const adminSchema = mongoose.Schema({
    name: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    otp: {
        type: Number,
    }

}, {
    timestamps: true
}
);

adminSchema.methods.generateAuthToken = function (_id) {
    return jwt.sign({ id: _id, role: 'admin' }, privateKey.SECRET, { expiresIn: '15d' });
};

adminSchema.methods.generateRefershToken = function (_id) {
    return jwt.sign({ id: _id, role: 'admin' }, privateKey.SECRET, { expiresIn: '30d' });
};

const Admin = mongoose.model('Admin', adminSchema);

export { Admin };
