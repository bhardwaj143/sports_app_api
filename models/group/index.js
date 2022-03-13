import mongoose from "mongoose";
import { User } from '../../models/index.js';

const participantSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    admin: {
        type: Boolean,
        default: false
    },
}, { _id: false }, { typeKey: '$type' });

const groupSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    groupicon: {
        type: String,
    },
    participants: {
        type: [participantSchema],
        default: []
    },
    createdBy: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    isGroup: {
        type: Boolean,
        default: false
    },
    deleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

export const Group = mongoose.model('Group', groupSchema);
