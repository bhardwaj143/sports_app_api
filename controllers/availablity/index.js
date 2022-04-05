import Router from 'express';
import moment from 'moment';
import { catchAsyncAction, makeResponse, responseMessages, statusCodes } from '../../helpers/index.js';
import { coachAuth, validators } from '../../middleware/index.js';
import { addAvailability, findAvailability, findAvailabilityDetails, updateAvailability } from '../../services/index.js';

//Response Status code
const { SUCCESS, RECORD_CREATED, NOT_FOUND } = statusCodes;

//Response Messages
const { AVAILABILITY_ADDED, NO_DATA_FOUND, FETCH, UPDATE_SUCCESS } = responseMessages;

const router = Router();

//Register Coach
router.post('/', coachAuth, validators('ADD_OR_UPDATE_AVAILABILITY'), catchAsyncAction(async (req, res) => {
    //   let availabilityRecord = await findAvailability({ coachId: req.body.coachId });
    //   let updatedAvailability;
    //   if(availabilityRecord) {

    //   }
    //   else {
    //     updatedAvailability = await addCoach({ mobileNumber: req.body.mobileNumber, password });
    //   }
    req.body.coachId = req.userData.id;
    req.body.startDate = moment(new Date()).format('DD MMMM YYYY');
    req.body.endDate = moment().add(req.body.availableForDays, "days").format('DD MMMM YYYY');
    let newAvailability = await addAvailability(req.body);
    return makeResponse(res, RECORD_CREATED, true, AVAILABILITY_ADDED, newAvailability);
}));

// Availability List
router.get('/', coachAuth, catchAsyncAction(async (req, res) => {
    let searchProps = {};
    if(req.query.isActive) searchProps['isActive'] = req.query.isActive;
    let availabilityRecords = await findAvailability(searchProps);
    return makeResponse(res, SUCCESS, true, FETCH, availabilityRecords);
}));

// Availability Details
router.get('/:id', coachAuth, catchAsyncAction(async (req, res) => {
    let availabilityRecord = await findAvailabilityDetails({ _id: req.params.id });
    return makeResponse(res, SUCCESS, true, FETCH, availabilityRecord);
}));

// Update Availability fields
router.patch('/:id', coachAuth, catchAsyncAction(async (req, res) => {
    let availabilityRecord = await findAvailability({ _id: req.params.id });
    if (!availabilityRecord) return makeResponse(res, NOT_FOUND, false, NO_DATA_FOUND);
    let updatedAvailability = await updateAvailability(req.body, { _id: req.params.id });
    return makeResponse(res, SUCCESS, true, UPDATE_SUCCESS, updatedAvailability);
}));

export const availabilityController = router;
