import Router from 'express';
import { makeResponse, responseMessages, userMapper, statusCodes } from '../../helpers/index.js';
import { validators } from '../../middleware/index.js';
import upload from '../../middleware/upload/index.js';
import { addCoach, findUserByField } from '../../services/index.js';

//Response Status code
const { SUCCESS, NOT_FOUND, RECORD_ALREADY_EXISTS } = statusCodes;

const {ALREADY_EXIST, LOGIN, INVALID, USER_NOTFOUND, PASSWORD_RESET_OTP_SENT, PASSWORD_CHANGED, OTP_VERIFIED, EMAIL_NOT_REGISTER, OTP_MISMATCH,
    PASSWORD_RESET_SUCCESS, SIGNUP_SUCCESS, REGISTERD } = responseMessages;

const router = Router();

//User register
router.get("/login", (req, res, next) => {
    res.json(["Tony","Lisa","Michael","Ginger","Food"]);
   });

router.post('/register',  upload.fields([{ name: 'profile_pic', maxCount: 1 }]), 
// validators('COACH_REGISTER'),
 async (req, res) => {
    const {  profile_pic, firstName, lastName, mobileNumber, alternateMobileNumber, email } = req.body;
   
    let userRecord = await findUserByField({ mobileNumber: req.body.mobileNumber });
    let userEmailRecord = await findUserByField({ email: req.body.email });
    console.log("userEmailRecord",userEmailRecord)
    console.log("userRecord",userRecord)
    if (userEmailRecord) return makeResponse(res, RECORD_ALREADY_EXISTS, false, 'ALREADY EXIST EMAIL');
    if (userRecord) return makeResponse(res, RECORD_ALREADY_EXISTS, false, 'ALREADY EXIST NUMBER');
    if (req.files.profile_pic.length > 0) req.body.profile_pic = req.files.profile_pic[0].path;

    console.log("111111111111111111111111",req.body)
    let newUser = await addCoach(req.body);
    // Mapping for removing password
    // let newUserMapper = await userMapper(newUser);
    return makeResponse(res, SUCCESS, true, REGISTERD, newUser);

});

export const coachController = router;