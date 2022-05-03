import Router from 'express';
import { catchAsyncAction, makeResponse, responseMessages, statusCodes, userMapper, OTP_Message } from '../../helpers/index.js';
import { coachAuth, validators } from '../../middleware/index.js';
import upload from '../../middleware/upload/index.js';
import { hashPassword, addCoach, findCoachDetail, findCoachById, updateCoach, matchPassword, changeCoachPassword, sendOtp, findAllCategories, findAllCategoriesCount, addStudent, findStudentById } from '../../services/index.js';
import mongoose from "mongoose";

//Response Status code
const { SUCCESS, RECORD_ALREADY_EXISTS, NOT_FOUND, BAD_REQUEST, RECORD_CREATED } = statusCodes;

//Response Messages
const { ALREADY_REGISTER,ALREADY_REGISTER_PASSWORD_RESET, COACH_NOTFOUND,STUDENT_NOTFOUND, UPDATE_COACH,UPDATE_STUDENT, STUDENT_ALREADY_EXIST, INVALID, REGISTERD, LOGIN, INVALID_PASSWORD, PASSWORD_CHANGED, FETCH_OWN_PROFILE, VERIFY_OTP, OTP_MISMATCH, OTP_SENT, FETCH_ALL_CATEGORIES, NOT_REGISTERED, OTP_FOR_PASSWORD, RESET_PASSWORD } = responseMessages;

const router = Router();



//update Coach fields
router.post('/sign-up', upload.fields([{
    name: 'profile_pic',
    maxCount: 1
  }]),catchAsyncAction(async (req, res) => {
    let name = req.body.firstName.concat(req.body.lastName);
    if (req?.files?.profile_pic?.length > 0) req.body.profile_pic = req.files.profile_pic[0].path;
    if (name) req.body.fullName = name;
    if (req.body.password) req.body.password = await hashPassword(req.body.password);

    let data = await findStudentById({email : req.body.email})
    if(data) return makeResponse(res, BAD_REQUEST, false, STUDENT_ALREADY_EXIST);
    let studentProfile = await addStudent(req.body);
    //Delete fields temporary from response
    let studentRecord = await userMapper(studentProfile);
    return makeResponse(res, SUCCESS, true, UPDATE_STUDENT, studentRecord);
}));


//Login STUDENT
router.post('/login', validators('STUDENT_LOGIN'), catchAsyncAction(async (req, res) => {
  const { email, password } = req.body;
  const student = await findStudentById({ email });
  if (!student) return makeResponse(res, NOT_FOUND, false, STUDENT_NOTFOUND);
  const passwordCorrect = await matchPassword(password, student.password);
  if (!passwordCorrect) return makeResponse(res, BAD_REQUEST, false, INVALID);
  const accessToken = student.generateAuthToken(student._id);
  const refreshToken = student.generateRefershToken(student._id);
  return makeResponse(res, SUCCESS, true, LOGIN, { accessToken, refreshToken });
}));

export const studentController = router;