import Joi from 'joi';

// Validation Cases
export const validationSchema = (action) => {
    switch (action) {
        case 'ADD_COACH': {
            return {
                mobileNumber: Joi.string().required(),
                password: Joi.string().required()
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
    }
    return {};
};
