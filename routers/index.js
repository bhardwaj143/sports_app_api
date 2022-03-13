import Router from 'express';
import { adminController, groupController, userController } from '../controllers/index.js'

const router = Router();

router.use('/users', userController);
router.use('/group', groupController);
router.use('/admin', adminController)

export { router };
