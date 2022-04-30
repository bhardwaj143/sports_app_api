import { generateOtp } from "../../services/index.js";
const otp = generateOtp();

export const responseMessages = {
    'ACCOUNT_DISABLED': 'Your account is disabled please contact to admin',
    'ALREADY_REGISTER': 'Mobile-Number already registered',
    'ALREADY_REGISTER_PASSWORD_RESET': 'Mobile-Number already registered pasword is not set',
    'UPDATE_COACH': 'Coach Updated Successfully',
    'COACH_NOTFOUND': 'Coach not found',
    'ALREADY_EXIST': 'Aleardy Exist Please Login',
    'REGISTERD': 'Registered Successfully',
    'GROUP_CREATED': 'Group Created Successfully',
    'INVALID_EMAIL': 'Email not exist',
    'INCORRECT_PASSWORD': 'Incorrect password',
    'LOGIN': 'Logged in successfully',
    'USER_NOT_FOUND': 'User not found',
    'UNAUTHORIZED': 'Unauthorized',
    'FETCH_CONTACTS': 'Fetch Contacts Successfully',
    'FETCH_TALKIE_CONTACTS': 'Fetch Talkie Contacts Successfully',
    'FETCH_All_Group': 'Fetch All Group Successfully',
    'LOGIN': 'Login successfully',
    'OTP_MISMATCH': 'OTP mismatched',
    'INVALID_PASSWORD': 'Invalid old password',
    'INVALID': 'Invalid password',
    'PASSWORD_CHANGED': 'Password Changed Successfully',
    'FETCH_OWN_PROFILE': 'Fetch Own Profile Successfully',
    'DELETE_COACH_SUCCESSFULL' : 'Delete Coach Successfully',
    'ADMIN_ADDED': 'Admin added successfully',
    'USER_NOTFOUND': 'User not found',
    'RESET_PASSWORD': 'Password Reset Successfully',
    'OTP_FOR_PASSWORD': 'OTP For Password Reset Sent To Your Email',
    'VERIFY_OTP': 'OTP Verified',
    'EMAIL_NOT_REGISTER': 'Email not registered',
    'ALREADY_EXIST': 'Aleardy Exist Please Login',
    'NO_DATA_FOUND' : 'No Data Found',
    'AVAILABILITY_ADDED': 'Availability added successful',
    'FETCH': 'Fetched Successfully',
    'UPDATE_SUCCESS': 'Updated Successfully',
    'ADD_SPORTS': 'Sports Category added successful',
    'OTP_MISMATCH': 'OTP mismatch',
    'OTP_SENT': 'OTP sent to your mobile number',
    'ADD_CATEGORIES': 'Categories Added Successfully',
    'FETCH_CATEGORIES': 'Fetch Categories Succesfully',
    'FETCH_ALL_CATEGORIES': 'Fetch Categories Succesfully',
    'UPDATE_CATEGORIES': 'Update Categories Succesfully',
    'DELETE_CATEGORIES': 'Delete Categories Succesfully',
    'NOT_REGISTERED': 'Mobile Number Not Registered',
    'OTP_FOR_PASSWORD': 'OTP For Password Reset Sent To Your Mobile Number',
    'RESET_PASSWORD': 'Password Reset Successfully',

}

export const notificationPayload = {}

export const OTP_Message = {
 'OTP': otp,
 'OTP_MESSAGE' : `Dear User OTP for Login into Your account is ${otp}-SafeWash DryCleaners`
}

export const statusCodes = {
    'SUCCESS': 200,
    'RECORD_CREATED': 201,
    'BAD_REQUEST': 400,
    'AUTH_ERROR': 401,
    'FORBIDDEN': 403,
    'NOT_FOUND': 404,
    'INVALID_REQUEST': 405,
    'RECORD_ALREADY_EXISTS': 409,
    'SERVER_ERROR': 500
}

const makeResponse = async (res, statusCode, success, message, payload = null, meta = {}) =>
    new Promise(resolve => {
        res.status(statusCode)
            .send({
                success,
                code: statusCode,
                message,
                data: payload,
                meta
            });
        resolve(statusCode);
    });

export { makeResponse };
