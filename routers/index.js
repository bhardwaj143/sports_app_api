import Router from 'express';
import { adminController, availabilityController, coachController, groupController, userController } from '../controllers/index.js'

const router = Router();

router.use('/users', userController);
router.use('/group', groupController);
router.use('/admin', adminController);
router.use('/coach', coachController);
router.use('/availability', availabilityController);

export { router };
