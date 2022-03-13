import { Group } from '../../models/index.js';

//Add Group
export const addGroup = async (payload = {}) => {
    let group = new Group(payload);
    return group.save();
};

//Update Group
export const updateGroup = (userprops = {}, condition = {}) => new Promise((resolve, reject) => {
    Group.findOneAndUpdate(condition, { $set: userprops }, { new: true })
        .then(resolve)
        .catch(reject);
});

// Update Password
export const updatePassword = (id, password) => new Promise((resolve, reject) => {
    Group.findById(id)
        .then((doc) => {
            doc.password = password;
            doc.save();
            resolve();
        })
        .catch(reject);
});

//Delete Group
export const deleteGroup = (id) => new Promise((resolve, reject) => {
    Group.updateMany({ _id: { $in: id } }, { $set: { isDeleted: true } })
        .then(resolve)
        .catch(reject)
});

//Update device token
export const updateDeviceToken = (_id, data) => new Promise((resolve, reject) => {
    Group.findOneAndUpdate({ _id: _id }, { $set: data }, { new: true })
        .then(resolve)
        .catch(reject);
});

//set device token null
export const setDeviceToken = (_id) => new Promise((resolve, reject) => {
    Group.findOneAndUpdate({ _id: _id }, { $set: { device_token: undefined } }, { new: true })
        .then(resolve)
        .catch(reject);
});

//Find All group
export const findAllGroup = (search = {}) => new Promise((resolve, reject) => {
    Group.find(search)
        .populate('participants.userId')
        .then(resolve)
        .catch(reject)
});
