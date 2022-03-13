import Router from 'express';
import { catchAsyncAction, makeResponse, responseMessages, statusCodes, userMapper } from '../../helpers/index.js';
import { auth, validators } from '../../middleware/index.js';
import upload from '../../middleware/upload/index.js';
import { addUser, findAllContacts, findUserDetail, getcontacts } from '../../services/index.js';

//Response Status code
const { SUCCESS, NOT_FOUND, RECORD_ALREADY_EXISTS } = statusCodes;

//Response Messages
const { ALREADY_EXIST, REGISTERD, FETCH_CONTACTS, FETCH_TALKIE_CONTACTS, INVALID_EMAIL, INCORRECT_PASSWORD, LOGIN } = responseMessages;

const router = Router();


//Add user
router.post('/sign-up', upload.fields([{ name: 'profile_pic', maxCount: 1 }]), validators('ADD_USER'), catchAsyncAction(async (req, res) => {
    let userRecord = await findUserDetail({ mobileNumber: req.body.mobileNumber });
    if (userRecord) return makeResponse(res, RECORD_ALREADY_EXISTS, false, ALREADY_EXIST);
    if (req?.files?.profile_pic?.length > 0) req.body.profile_pic = req.files.profile_pic[0].path;
    let newUser = await addUser(req.body);
    // Mapping for removing password
    let newUserMapper = await userMapper(newUser);
    return makeResponse(res, SUCCESS, true, REGISTERD, newUserMapper);
}));

//Get talkie space contact
router.get('/', catchAsyncAction(async (req, res) => {
    let talkieContact = await findAllContacts();
    return makeResponse(res, SUCCESS, true, FETCH_TALKIE_CONTACTS, talkieContact);
}));

//get all contact listing
router.post('/contactsListing', catchAsyncAction(async (req, res) => {
    let talkieContacts = [];
    let mobileNumber = [];
    const userData = await getcontacts();
    const receivedContacts = req.body.contacts;
    userData.filter(e => { mobileNumber.push(e.mobileNumber) })
    userData.forEach(e => {
        receivedContacts.forEach(v => {
            if (e.mobileNumber === v.PhoneNumber) {
                talkieContacts.push({
                    Name: v.Name,
                    PhoneNumber: e.mobileNumber,
                    Image: e.profile_pic,
                    Status: e.status,
                    Id: e._id
                })
            }
        })
    })
    const otherContacts = receivedContacts.filter(function (n) { return !this.has(n.PhoneNumber) }, new Set(mobileNumber));
    const result = {
        talkieContacts,
        otherContacts
    }
    return makeResponse(res, SUCCESS, true, FETCH_CONTACTS, result);
}))
export const userController = router;
