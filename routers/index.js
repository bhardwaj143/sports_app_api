import Router from 'express';
import { adminController, availabilityController, coachController, sportsCategoryController } from '../controllers/index.js'

const router = Router();

router.use('/admin', adminController);
router.use('/coach', coachController);
router.use('/availability', availabilityController);
router.use('/sports-category', sportsCategoryController);

export { router };
