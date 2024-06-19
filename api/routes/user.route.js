import express, { Router } from 'express';
import { updateUser, userTest } from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.get('/test', userTest);
router.post('/update/:id', verifyToken,updateUser);

export default router;