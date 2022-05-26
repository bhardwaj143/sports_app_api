import Router from "express";
import {
  catchAsyncAction,
  makeResponse,
  responseMessages,
  statusCodes,
  userMapper,
  OTP_Message,
} from "../../helpers/index.js";
import { coachAuth, validators } from "../../middleware/index.js";
import upload from "../../middleware/upload/index.js";
import {
  hashPassword,
  addCoach,
  findCoachDetail,
  findCoachById,
  updateCoach,
  matchPassword,
  changeCoachPassword,
  sendOtp,
  findAllCategories,
  findAllCategoriesCount,
  findSportsCategoryDetail,
} from "../../services/index.js";
import mongoose from "mongoose";
import {
  addPricing,
  findCoachPricingDetail,
} from "../../services/pricing/index.js";
import { Pricing } from "../../models/index.js";

//Response Status code
const { SUCCESS, RECORD_ALREADY_EXISTS, NOT_FOUND, BAD_REQUEST } = statusCodes;

//Response Messages
const {
  ALREADY_REGISTER,
  COACH_NOTFOUND,
  UPDATE_COACH,
  UPDATE_COACH_PRICING,
  INVALID,
  REGISTERD,
  LOGIN,
  INVALID_PASSWORD,
  PASSWORD_CHANGED,
  FETCH_OWN_PROFILE,
  VERIFY_OTP,
  OTP_MISMATCH,
  OTP_SENT,
  FETCH_ALL_CATEGORIES,
  NOT_REGISTERED,
  OTP_FOR_PASSWORD,
  RESET_PASSWORD,
} = responseMessages;

const router = Router();

// Coach Pricing
router.post(
  "/",
  coachAuth,
  catchAsyncAction(async (req, res) => {
    let coach = await findCoachById({ _id: req.userData.id });
    let payload = {
      coachId: coach._id,
      pricingDetail: req.body.pricingDetail,
    };
    // let payload = {
    //   "pricingDetail" : [{ "days": "3", "price": [120, 2000 , 3000] ,"startDate" : "12-10-2022", "endDate": "12-10-2022" }, { "days": "5", "price": [1000, 2000 , 3000], "startDate" : "12-10-2022", "endDate": "12-10-2022" }, { "days": "2", "price": [1000, 2000 , 3000], "startDate" : "12-10-2022", "endDate": "12-10-2022" }]
    //   }
    var query = { coachId: coach._id }
    Pricing.findOneAndUpdate(query, { $set: payload }, { new: true },function (error, result) {
      if (error) return;
      return makeResponse(res, SUCCESS, true, UPDATE_COACH_PRICING, result);
    });
  })
);

// Coach Pricing Get
router.get(
  "/details/:id",
  coachAuth,
  catchAsyncAction(async (req, res) => {
    let pricingDetails = await findCoachPricingDetail({
      coachId: req.params.id,
    });
    return makeResponse(
      res,
      SUCCESS,
      true,
      FETCH_ALL_CATEGORIES,
      pricingDetails
    );
  })
);

export const pricingController = router;
