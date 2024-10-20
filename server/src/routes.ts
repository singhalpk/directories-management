import { Router } from 'express';
import dirRoutes from '$root/modules/dirRoutes';

const router = Router();

router.use('/dir', dirRoutes);

export default router;
