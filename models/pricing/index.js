import mongoose from "mongoose";

const pricingDetailSchema = mongoose.Schema({
    days: { type: String, default: 0 },
    price: { type: Array, default: 0 },
}, { timestamps: false, _id: false });

const pricingSchema = mongoose.Schema({
    pricingDetail : {
        type: [pricingDetailSchema],
        required: true
    },
    coachId: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: 'User'
    },
}, {
    timestamps: true
});

const Pricing = mongoose.model('Pricing', pricingSchema);

export { Pricing };
