import Router from 'express';
// import { coachController } from '../controllers/coach/index.js';
import { adminController, groupController, userController, coachController } from '../controllers/index.js'


const router = Router();

router.use('/users', userController);
router.use('/group', groupController);
router.use('/admin', adminController);
router.use('/coach', coachController);


export { router };
