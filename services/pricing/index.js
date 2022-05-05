import { Pricing  } from '../../models/index.js';


// //Add Pricing
// export const addPricing = async (payload = {}, role) => {
//     let price = new Pricing(payload);
//     return price.save();
// };

//Update Sports Category
export const addPricing = (payload = {}, condition = {}) => new Promise((resolve, reject) => {
    Pricing.findOneAndUpdate(condition, { $set: payload }, { new: true })
        .then(resolve)
        .catch(reject);
});

export const findCoachPricingDetail = async (condition = {}) => await Pricing.findOne(condition).exec();
