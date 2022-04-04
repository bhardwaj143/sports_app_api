import Router from 'express';
import { catchAsyncAction, makeResponse, responseMessages, statusCodes, userMapper, OTP_Message } from '../../helpers/index.js';
import { coachAuth, validators } from '../../middleware/index.js';
import upload from '../../middleware/upload/index.js';
import { hashPassword, addCoach, findCoachDetail, findCoachById, updateCoach, matchPassword, changeCoachPassword, sendOtp, findAllCategories, findAllCategoriesCount } from '../../services/index.js';
import mongoose from "mongoose";

//Response Status code
const { SUCCESS, RECORD_ALREADY_EXISTS, NOT_FOUND, BAD_REQUEST } = statusCodes;

//Response Messages
const { ALREADY_REGISTER, COACH_NOTFOUND, UPDATE_COACH, INVALID, REGISTERD, LOGIN, INVALID_PASSWORD, PASSWORD_CHANGED, FETCH_OWN_PROFILE, VERIFY_OTP, OTP_MISMATCH, OTP_SENT, FETCH_ALL_CATEGORIES, NOT_REGISTERED, OTP_FOR_PASSWORD, RESET_PASSWORD } = responseMessages;

const router = Router();

//Register Coach
router.post('/sign-up', validators('ADD_COACH'), catchAsyncAction(async (req, res) => {
  let sent_OTP = OTP_Message.OTP;
  let findcoach = await findCoachDetail({ mobileNumber: req.body.mobileNumber });
  if (findcoach) return makeResponse(res, RECORD_ALREADY_EXISTS, false, ALREADY_REGISTER);
  let otp = await sendOtp(req.body.mobileNumber, OTP_Message.OTP_MESSAGE);
  //set incrept password
  let password = await hashPassword(req.body.password);
  let coach = await addCoach({ mobileNumber: req.body.mobileNumber, password, otp: sent_OTP });
  //Genrate access token and Refresh token
  let accessToken = coach.generateAuthToken(coach._id);
  const refreshToken = coach.generateRefershToken(coach._id);
  // Mapping for removing password
  let newCoachMapper = await userMapper(coach);
  return makeResponse(res, SUCCESS, true, REGISTERD, newCoachMapper, { accessToken, refreshToken });
}));

//update Coach fields
router.patch('/', upload.fields([{
  name: 'profile_pic',
  maxCount: 1
}, {
  name: 'Upload_vaccination_certificate',
  maxCount: 1
},
{
  name: 'upload_certificates',
  maxCount: 3
}]), coachAuth, catchAsyncAction(async (req, res) => {
  let certificates = [];
  let existing_certificates = [];
  //concatenate first name and last name for internal use
  let name = req.body.firstName.concat(req.body.lastName);
  if (req.body?.existing_certificates?.length > 0) existing_certificates = req.body.existing_certificates;
  if (req.files?.upload_certificates?.length > 0) {
    await Promise.all(
      req.files.upload_certificates.map(async file => {
        certificates.push(file.path);
      })
    );
    req.body.upload_certificates = existing_certificates.concat(certificates);
  };
  if (req?.files?.profile_pic?.length > 0) req.body.profile_pic = req.files.profile_pic[0].path;
  if (req?.files?.Upload_vaccination_certificate?.length > 0) req.body.Upload_vaccination_certificate = req.files.Upload_vaccination_certificate[0].path;
  //adding address into database
  if (req.body?.formattedAddress && req.body?.geo) {
    let coachLocation = [
      {
        kilometer_range: req.body.kilometer_range,
        completeAddress: req.body.completeAddress,
        floor: req.body.floor,
        landmark: req.body.landmark,
        formattedAddress: req.body.formattedAddress,
        geo: req.body.geo?.split(',')
      }
    ];
    req.body.coachLocation = coachLocation;
  };
  if (req.body?.coachStatus) {
    let status = [
      {
        coachStatus: req.body.coachStatus,
        message: req.body.message
      }
    ];
    req.body.status = status;
  };
  if (name) req.body.fullName = name;
  if (req.body.password) req.body.password = await hashPassword(req.body.password);
  let updateCoachProfile = await updateCoach(req.body, { _id: req.userData.id });
  //Delete fields temporary from response
  let coachRecord = await userMapper(updateCoachProfile);
  return makeResponse(res, SUCCESS, true, UPDATE_COACH, coachRecord);
}));

//Login Coach
router.post('/login', validators('LOGIN'), catchAsyncAction(async (req, res) => {
  const { mobileNumber, password } = req.body;
  const coach = await findcoach({ mobileNumber });
  if (!coach) return makeResponse(res, NOT_FOUND, false, COACH_NOTFOUND);
  const passwordCorrect = await matchPassword(password, admin.password);
  if (!passwordCorrect) return makeResponse(res, BAD_REQUEST, false, INVALID);
  const accessToken = coach.generateAuthToken(coach._id);
  const refreshToken = coach.generateRefershToken(coach._id);
  return makeResponse(res, SUCCESS, true, LOGIN, { accessToken, refreshToken });
}));

//Change Password
router.patch('/change-password', coachAuth, validators('CHANGE_PASSWORD'), (req, res) => {
  const { email, password } = req.userData;
  matchPassword(req.body.oldPassword, password)
    .then(async result => {
      if (result) {
        return changeCoachPassword(email, { password: await hashPassword(req.body.newPassword) });
      }
      throw new Error(INVALID_PASSWORD);
    })
    .then(async () => {
      return makeResponse(
        res,
        SUCCESS,
        true,
        PASSWORD_CHANGED
      );
    })
    .catch(async error => {
      return makeResponse(
        res,
        BAD_REQUEST,
        false,
        error.message
      );
    });
});

//get own profile
router.get('/me', coachAuth, catchAsyncAction(async (req, res) => {
  let coach = await findCoachById({ _id: req.userData.id });
  let newCoachMapper = await userMapper(coach);
  return makeResponse(res, SUCCESS, true, FETCH_OWN_PROFILE, newCoachMapper);
}));

//Verify OTP
router.post('/verify-otp', catchAsyncAction(async (req, res) => {
  let coach = await findCoachById({ mobileNumber: req.body.mobileNumber });
  if (!coach) return makeResponse(res, NOT_FOUND, false, NOT_REGISTERED);
  //Genrate access token and Refresh token
  let accessToken = coach.generateAuthToken(coach._id);
  const refreshToken = coach.generateRefershToken(coach._id);
  if (coach.otp === req.body.otp) return makeResponse(res, SUCCESS, true, VERIFY_OTP, { accessToken, refreshToken });
  else {
    return makeResponse(res, BAD_REQUEST, false, OTP_MISMATCH);
  }
}));

//Resend OTP
router.post('/resend-otp', catchAsyncAction(async (req, res) => {
  let coach = await findCoachById({ _id: req.userData.id });
  //Sent OTP
  let otp = await sendOtp(coach.mobileNumber, OTP_Message.OTP_MESSAGE);
  let sentOtp = OTP_Message.OTP;
  //Updated OTP into registered profile
  let updateCoachProfile = await updateCoach({ otp: sentOtp }, { _id: req.userData.id });
  return makeResponse(res, SUCCESS, true, OTP_SENT);
}));

//Forgot password
router.post('/forgot-password', catchAsyncAction(async (req, res) => {
  let coach = await findCoachById({ mobileNumber: req.body.mobileNumber });
  if (!coach) return makeResponse(res, NOT_FOUND, false, NOT_REGISTERED);
  //Sent OTP
  let otp = await sendOtp(coach.mobileNumber, OTP_Message.OTP_MESSAGE);
  let sentOtp = OTP_Message.OTP;
  //Updated OTP into registered profile
  let updateCoachProfile = await updateCoach({ otp: sentOtp }, { mobileNumber: req.body.mobileNumber });
  return makeResponse(res, SUCCESS, true, OTP_FOR_PASSWORD);
}));

//Reset Password
router.post('/reset-password', coachAuth, catchAsyncAction(async (req, res) => {
  const { password } = req.body;
  let updateCoachProfile = await updateCoach({ password: await hashPassword(password) }, { _id: req.userData.id });
  return makeResponse(res, SUCCESS, true, RESET_PASSWORD);
}));

//Categories Listing
router.get('/categoriesList', catchAsyncAction(async (req, res) => {
  let searchingCategories = { isDeleted: false };
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
  return makeResponse(res, SUCCESS, true, FETCH_ALL_CATEGORIES, categories, {
    current_page: Number(page),
    total_records: categoriesCount,
    total_pages: Math.ceil(categoriesCount / limit),
  });
}));


export const coachController = router;
