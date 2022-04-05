import { SportsCategory } from "../../models/index.js";

//Find Sports Category detail
export const findSportsCategoryDetail = async (condition = {}) => await SportsCategory.findOne(condition).exec();

//Find Sports Category
export const findSportsCategory = async (skip, limit, condition = {}) => await SportsCategory.find(condition).skip(skip).limit(Number(limit)).sort('createdAt').exec();


//Find Sports Category
export const findSportsCategoryRecords = async (condition = {}) => await SportsCategory.find(condition).exec();

//coach count
export const findSportsCategoryCount = async (condition = {}) => await SportsCategory.countDocuments(condition).exec();

//Add Sports Category
export const addSportsCategory = async (payload = {}) => {
    let sports_category = new SportsCategory(payload);
    return sports_category.save();
};

//Update Sports Category
export const updateSportsCategory = (sportsprops = {}, condition = {}) => new Promise((resolve, reject) => {
    SportsCategory.findOneAndUpdate(condition, { $set: sportsprops }, { new: true })
        .then(resolve)
        .catch(reject);
});

//Delete Sports Category
export const deleteSportsCategory = (id) => new Promise((resolve, reject) => {
    SportsCategory.updateMany({ _id: { $in: id } }, { $set: { isDeleted: true } })
        .then(resolve)
        .catch(reject)
});
