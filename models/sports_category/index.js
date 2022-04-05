import mongoose from "mongoose";
const { Schema, model } = mongoose;

const sportsCategory = Schema({
    name: {
        type: String,
        required: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

export const SportsCategory = model('SportsCategory', sportsCategory);
