import Router from 'express';
import { catchAsyncAction, makeResponse, responseMessages, statusCodes } from '../../helpers/index.js';
import {  validators } from '../../middleware/index.js';
import { addCategories, deleteCategories, findAllCategories, findCategoriesById, updateCategories } from '../../services/index.js';
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
    let categories = await findAllCategories({});
    return makeResponse(res, SUCCESS, true, FETCH_ALL_CATEGORIES, categories);
}));

//update categories
router.get('/', adminAuth, catchAsyncAction(async (req, res) => {
    let categories = await updateCategories({ _id: req.body.id }, req.body)
    return makeResponse(res, SUCCESS, true, UPDATE_CATEGORIES, categories);
}));

//Delete categories
router.delete('/:id', adminAuth, catchAsyncAction(async (req, res) => {
    let categories = await deleteCategories({ _id: req.params.id })
    return makeResponse(res, SUCCESS, true, DELETE_CATEGORIES, categories);
}));

export const categoriesController = router;
