import mongoose from "mongoose";


const categoriesSchema = mongoose.Schema({
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
}
);
const Categories = mongoose.model('Categories', categoriesSchema);


export { Categories };
