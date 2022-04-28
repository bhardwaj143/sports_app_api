import Router from 'express';
import { catchAsyncAction, makeResponse, responseMessages, statusCodes, userMapper, OTP_Message } from '../../helpers/index.js';
import { coachAuth, validators } from '../../middleware/index.js';
import upload from '../../middleware/upload/index.js';
import { hashPassword, addCoach, findCoachDetail, findCoachById, updateCoach, matchPassword, changeCoachPassword, sendOtp, findAllCategories, findAllCategoriesCount, findSportsCategoryDetail } from '../../services/index.js';
import mongoose from "mongoose";
import { addPricing, findCoachPricingDetail } from '../../services/pricing/index.js';

//Response Status code
const { SUCCESS, RECORD_ALREADY_EXISTS, NOT_FOUND, BAD_REQUEST } = statusCodes;

//Response Messages
const { ALREADY_REGISTER, COACH_NOTFOUND, UPDATE_COACH, INVALID, REGISTERD, LOGIN, INVALID_PASSWORD, PASSWORD_CHANGED, FETCH_OWN_PROFILE, VERIFY_OTP, OTP_MISMATCH, OTP_SENT, FETCH_ALL_CATEGORIES, NOT_REGISTERED, OTP_FOR_PASSWORD, RESET_PASSWORD } = responseMessages;

const router = Router();

// Coach Pricing
router.post('/',  catchAsyncAction(async (req, res) => {
  // {
  //   "coachId" : "623f630a1807d727ab92e4cd",
  //   "pricingDetail" : [{ "days": "3", "price": [1000, 2000 , 3000] }, { "days": "5", "price": [1000, 2000 , 3000] }, { "days": "2", "price": [1000, 2000 , 3000] }]
  //   }
    
    let addPricingData = await addPricing(req.body);
    return makeResponse(res, SUCCESS, true, UPDATE_COACH, addPricingData);
  }));

  // Coach Pricing Get
router.get('/details/:id',  catchAsyncAction(async (req, res) => {
    let pricingDetails = await findCoachPricingDetail({ coachId: req.params.id });
    return makeResponse(res, SUCCESS, true, FETCH_ALL_CATEGORIES, pricingDetails);
  }));



  export const pricingController = router;
