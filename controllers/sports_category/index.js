import Router from 'express';
import { catchAsyncAction, makeResponse, responseMessages, statusCodes } from '../../helpers/index.js';
import { coachAuth } from '../../middleware/index.js';
import { findSportsCategoryRecords } from '../../services/index.js';

//Response Status code
const { SUCCESS } = statusCodes;

//Response Messages
const { FETCH } = responseMessages;

const router = Router();

// Sports Category Records
router.get('/', coachAuth, catchAsyncAction(async (req, res) => {
  let sportsCategory = await findSportsCategoryRecords({ isDeleted: false });
  return makeResponse(res, SUCCESS, true, FETCH, sportsCategory);
}));

export const sportsCategoryController = router;
