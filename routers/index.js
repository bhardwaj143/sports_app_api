import Router from 'express';
import { adminController, categoriesController, coachController } from '../controllers/index.js'

const router = Router();

router.use('/admin', adminController);
router.use('/coach', coachController);
router.use('/category', categoriesController);

export { router };
