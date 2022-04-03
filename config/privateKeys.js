import dotenv from 'dotenv';
dotenv.config();

let {
    DB_STRING,
    DB_STRING_DEV,
    PORT,
    nodemailerEmail,
    nodemailerPassword,
    base_url,
    username,
    apikey,
    senderid
} = process.env;

export const privateKey = {
    'DB_STRING': DB_STRING,
    'DB_STRING_DEV': DB_STRING_DEV,
    'PORT': PORT,
    'EMAIL': nodemailerEmail,
    'PASSWORD': nodemailerPassword,
    'BASE_URL': base_url,
    'USER_NAME': username,
    'API_KEY': apikey,
    'SENDER_ID': senderid
};
