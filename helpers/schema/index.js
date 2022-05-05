import Joi from 'joi';

// Validation Cases
export const validationSchema = (action) => {
    switch (action) {
        case 'ADD_COACH': {
            return {
                mobileNumber: Joi.string().required()
            };
        }
        case 'LOGIN': {
            return {
                email: Joi.string().email().required(),
                password: Joi.string().required()
            };
        }
        case 'CHANGE_PASSWORD': {
            return {
                oldPassword: Joi.string().required(),
                newPassword: Joi.string().required()
            }
        }
        case 'ADD_OR_UPDATE_AVAILABILITY': {
            return {
                days: Joi.array().required(),
                timing: Joi.array().required(),
                availableForDays: Joi.number().required()
            }
        }
        case 'COACH_LOGIN': {
            return {
                mobileNumber: Joi.string().required(),
                password: Joi.string().required()
            }
        }
        case 'UPDATE_STATUS': {
            return {
                approve_status: Joi.string().required(),
                approve_note: Joi.string().optional()
            }
        }
        case 'ADD_SPORTS_CATEGORY': {
            return {
                name: Joi.string().required()
            }
        }
        // case 'STUDENT_REGISTER' : {
        //     return {
        //         email: Joi.string().email().required(),
        //         password: Joi.string().required()
        //     }
        // }
        case 'STUDENT_LOGIN' : {
            return {
                email: Joi.string().email().required(),
                password: Joi.string().required()
            }
        }
    }
    return {};
};
