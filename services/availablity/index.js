import { Availability } from "../../models/index.js";

//Add Availablity
export const addAvailability = async (payload = {}) => {
    let availability = new Availability(payload);
    return availability.save();
};

//Find Availability
export const findAvailability = async (condition) => Availability.find(condition).sort({ createdAt: -1 }).exec();

//Find Availability Details
export const findAvailabilityDetails = async (condition) => Availability.findOne(condition).exec();

//Update Availability
export const updateAvailability = (availabilityprops = {}, condition = {}) => new Promise((resolve, reject) => {
    Availability.findOneAndUpdate(condition, availabilityprops, { new: true })
        .then(resolve)
        .catch(reject);
});

//Delete Availability
export const deleteAvailability = async (condition = {}) => await Availability.deleteOne(condition).exec();

