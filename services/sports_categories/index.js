import { Categories } from '../../models/index.js';

//Add Categories
export const addCategories = async (payload = {}) => {
    let categories = new Categories(payload);
    return categories.save();
};

//Update Categories
export const updateCategories = (condition = {}, data = {}) => new Promise((resolve, reject) => {
    Categories.findOneAndUpdate(condition, { $set: data }, { new: true })
        .then(resolve)
        .catch(reject);
});

//Delete Categories
export const deleteCategories = (id) => new Promise((resolve, reject) => {
    Categories.updateMany({ _id: { $in: id } }, { $set: { isDeleted: true } })
        .then(resolve)
        .catch(reject)
});

//Find All Categories
export const findAllCategories = async (skip, limit, search = {}) => {
    return await Categories.find(search)
      .skip(skip).limit(Number(limit))
      .sort('-createdAt')
      .exec()
  };

//Find Categories Id
export const findCategoriesById = async (condition = {}) => await Categories.findOne(condition).exec();

export const findAllCategoriesCount = async (search) => await Categories.countDocuments(search).exec();
