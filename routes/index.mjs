import express from 'express';
import userRoutes from './user.route.mjs';

const router = express.Router();

router.use('/users', userRoutes);

export default router;