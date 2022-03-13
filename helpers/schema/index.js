import Joi from 'joi';

// Validation Cases
export const validationSchema = (action) => {
    switch (action) {
        case 'ADD_USER': {
            return {
                mobileNumber: Joi.string().required(),
                status: Joi.string().required(),
                name: Joi.string().required(),
                userId: Joi.string().required()
            };
        }
        case 'LOGIN': {
            return {
                email: Joi.string().email().required(),
                password: Joi.string().required()
            };
        }
    }
    return {};
};
