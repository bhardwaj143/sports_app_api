import Router from 'express';
import { adminController, availabilityController, coachController, pricingController, sportsCategoryController, studentController } from '../controllers/index.js'

const router = Router();

router.use('/admin', adminController);
router.use('/coach', coachController);
router.use('/availability', availabilityController);
router.use('/sports-category', sportsCategoryController);
router.use('/pricing', pricingController);
router.use('/student', studentController);



export { router };
