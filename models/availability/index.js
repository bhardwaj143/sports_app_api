import mongoose from "mongoose";

const weekSchema = mongoose.Schema({
    name: {
        type: [String],
        required: true
    },
    number: {
        type: [String],
        required: true
    }
}, { timestamps: false, _id: false });

const timeSchema = mongoose.Schema({
    time: {
        type: [String],
        required: true
    },
    type: {
        type: String,
        required: true
    }
}, { timestamps: false, _id: false });

const notavailablefortimeSchema = mongoose.Schema({
    time: {
        type: String,
    },
    type: {
        type: String,
    },
    date: {
        type: String,
    }
}, { timestamps: false, _id: false });

const availabilitySchema = mongoose.Schema({
    days: {
        type: [String],
        required: true
    },
    timing: {
        type: [timeSchema],
        required: true
    },
    notAvailableForDays: {
        type: [notavailablefortimeSchema]
    },
    coachId: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: 'User'
    },
    availableForDays: {
        type: Number,
        required: true
    },
    startDate: {
        type: String,
        required: true
    },
    endDate: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

const Availability = mongoose.model('Availability', availabilitySchema);

export { Availability };
