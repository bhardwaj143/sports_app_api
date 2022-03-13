import Router from 'express';
import { catchAsyncAction, makeResponse, responseMessages, statusCodes, userMapper } from '../../helpers/index.js';
import { auth, validators } from '../../middleware/index.js';
import upload from '../../middleware/upload/index.js';
import { addGroup, findAllGroup } from '../../services/index.js';
import mongoose from "mongoose";

//Response Status code
const { SUCCESS, NOT_FOUND, RECORD_ALREADY_EXISTS } = statusCodes;

//Response Messages
const { GROUP_CREATED, FETCH_TALKIE_CONTACTS, FETCH_All_Group } = responseMessages;

const router = Router();


//create group
router.post('/', upload.fields([{ name: 'groupicon', maxCount: 1 }]), catchAsyncAction(async (req, res) => {
    if (req?.files?.groupicon?.length > 0) req.body.groupicon = req.files.groupicon[0].path;
    let id = mongoose.Types.ObjectId(req.body.participants[0]);
    let created = mongoose.Types.ObjectId(req.body.createdBy);
    let requestObj = {
        name: req.body.name,
        groupicon: req.files.groupicon[0].path,
        createdBy: created,
        participants: [{
            userId: id
        }]
    }
    let group = await addGroup(requestObj);
    return makeResponse(res, SUCCESS, true, GROUP_CREATED, group);
}));

//Get all groups
router.get('/', catchAsyncAction(async (req, res) => {
    let groups = await findAllGroup({createdBy: req.query.createdBy});
    return makeResponse(res, SUCCESS, true, FETCH_All_Group, groups);
}));

export const groupController = router;
