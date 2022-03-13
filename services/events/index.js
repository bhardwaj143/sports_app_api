import { Event } from "../../models/index.js";

//Find event detail
export const findEventDetail = async (condition = {}) => await Event.findOne(condition).exec();

//Add Event
export const addEvent = async (payload = {}) => {
    return (await new Event(payload).save()).toObject();
};

//Update Event
export const updateEvent = (eventprops = {}, condition = {}) => new Promise((resolve, reject) => {
    Event.findOneAndUpdate(condition, { $set: eventprops }, { new: true })
        .then(resolve)
        .catch(reject);
});
