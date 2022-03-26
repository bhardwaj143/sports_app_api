import { Coach } from '../../models/index.js';

//Find Coach detail
export const findCoachDetail = async (condition = {}) => await Coach.findOne(condition).exec();

//Find CoachBy Id
export const findCoachById = async (condition = {}) => await Coach.findOne(condition).exec();

//Add Coach
export const addCoach = async (payload = {}, role) => {
    payload.role = role;
    let coach = new Coach(payload);
    return coach.save();
};

//Update Coach
export const updateCoach = (userprops = {}, condition = {}) => new Promise((resolve, reject) => {
    Coach.findOneAndUpdate(condition, { $set: userprops }, { new: true })
        .then(resolve)
        .catch(reject);
});

//Change Password
export const changeCoachPassword = (email, data) => new Promise((resolve, reject) => {
    Coach.findOneAndUpdate({ email: email }, data,{ new: true })
      .then(resolve)
      .catch(reject);
  });

// Update Password
export const updatePassword = (id, password) => new Promise((resolve, reject) => {
    Coach.findById(id)
        .then((doc) => {
            doc.password = password;
            doc.save();
            resolve();
        })
        .catch(reject);
});

//Delete Coach
export const deleteCoach = (id) => new Promise((resolve, reject) => {
    Coach.updateMany({ _id: { $in: id } }, { $set: { isDeleted: true } })
        .then(resolve)
        .catch(reject)
});

//Update device token
export const updateDeviceToken = (_id, data) => new Promise((resolve, reject) => {
    Coach.findOneAndUpdate({ _id: _id }, { $set: data }, { new: true })
        .then(resolve)
        .catch(reject);
});

//set device token null
export const setDeviceToken = (_id) => new Promise((resolve, reject) => {
    Coach.findOneAndUpdate({ _id: _id }, { $set: { device_token: undefined } }, { new: true })
        .then(resolve)
        .catch(reject);
});
