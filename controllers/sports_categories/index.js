import Router from 'express';
import { catchAsyncAction, makeResponse, responseMessages, statusCodes } from '../../helpers/index.js';
import {  validators } from '../../middleware/index.js';
import { addCategories, deleteCategories, findAllCategories, findAllCategoriesCount, findCategoriesById, updateCategories } from '../../services/index.js';
import  adminAuth  from '../../middleware/auth/admin.js';

//Response Status code
const { SUCCESS, NOT_FOUND, RECORD_ALREADY_EXISTS } = statusCodes;

//Response Messages
const { ADD_CATEGORIES, FETCH_CATEGORIES, FETCH_ALL_CATEGORIES, UPDATE_CATEGORIES, DELETE_CATEGORIES } = responseMessages;

const router = Router();

//Added Categoris
router.post('/', adminAuth, catchAsyncAction(async (req, res) => {
    let categories = await addCategories(req.body);
    return makeResponse(res, SUCCESS, true, ADD_CATEGORIES, categories);
}));

//Find category by Id
router.get('/:id', adminAuth, catchAsyncAction(async (req, res) => {
    let categories = await findCategoriesById({_id: req.params.id});
    return makeResponse(res, SUCCESS, true, FETCH_CATEGORIES, categories);
}));

//Get all categories
router.get('/', adminAuth, catchAsyncAction(async (req, res) => {
     let searchingCategories = {isDeleted: false};
    let page = 1,
        limit = 10,
        skip = 0;
    if (req.query.page == 0) req.query.page = '';
    if (req.query.page) page = req.query.page;
    if (req.query.limit) limit = req.query.limit;
    skip = (page - 1) * limit;
    let regx;
    let searchFilter = req.query;
    if (searchFilter?.search) {
        regx = new RegExp(searchFilter?.search);
        searchingCategories = {
            isDeleted: false, $or: [{ 'name': { '$regex': regx, $options: 'i' } }]
        }
    };
    let categories = await findAllCategories(skip, limit, searchingCategories);
    let categoriesCount = await findAllCategoriesCount(searchingCategories);
    return makeResponse(res, SUCCESS, true, FETCH_ALL_CATEGORIES, categories,{
        current_page: Number(page),
        total_records: categoriesCount,
        total_pages: Math.ceil(categoriesCount / limit),
    });
}));

//update categories
router.patch('/:id', adminAuth, catchAsyncAction(async (req, res) => {
    let categories = await updateCategories({ _id: req.params.id }, req.body)
    return makeResponse(res, SUCCESS, true, UPDATE_CATEGORIES, categories);
}));

//Delete categories
router.delete('/:id', adminAuth, catchAsyncAction(async (req, res) => {
    let categories = await deleteCategories({ _id: req.params.id })
    return makeResponse(res, SUCCESS, true, DELETE_CATEGORIES, categories);
}));

export const categoriesController = router;
