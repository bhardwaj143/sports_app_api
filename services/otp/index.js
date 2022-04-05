import axios from 'axios';
import { privateKey } from '../../config/privateKeys.js'

const sendOtp = async (mobile, text) => new Promise((resolve, reject) => {
  const url = privateKey.BASE_URL + '?' + 'username' + '=' + privateKey.USER_NAME + '&' + 'apikey' + '=' + privateKey.API_KEY + '&' + 'senderid' + '=' + privateKey.SENDER_ID + '&' + 'mobile' + '=' + mobile + '&' + 'message' + '=' + text;
  axios.post(url)
		.then(function (response) {
			resolve(response);
		})
		.catch(function (error) {
			reject(error);
		});
});

export { sendOtp };