import mongoose from "mongoose";
const { Schema, model } = mongoose;

const trainerSchema = Schema({
    userId: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    status: {
        type: String,
        enum: ['Pending', 'Accepted', 'Reject'],
        default: 'Pending'
    }
}, { _id: false });

const eventSchema = Schema({
    senderId: {
        type: Schema.ObjectId,
        required: true,
        ref: 'User'
    },
    trainerId: [trainerSchema],
    eventDate: {
        type: String,
        required: true
    },
    eventTime: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

export const Event = model('Event', eventSchema);
