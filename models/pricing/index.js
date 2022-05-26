import mongoose from "mongoose";

const pricingDetailSchema = mongoose.Schema({
    days: { type: String, required: true},
    price: { type: Array, required: true },
    startDate : {type: Date, required: true},
    endDate :{type: Date,  required: true},
}, { timestamps: false, _id: false });

const pricingSchema = mongoose.Schema({
    pricingDetail : {
        type: [pricingDetailSchema],
        required: true
    },
    coachId: {
        type: mongoose.Schema.ObjectId,
        ref: 'Coach'
    },
}, {
    timestamps: true
});

const Pricing = mongoose.model('Pricing', pricingSchema);

export { Pricing };
