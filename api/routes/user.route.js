import express, { Router } from 'express';
import { userTest } from '../controllers/user.controller.js';

const router = express.Router();

router.get('/test', userTest);

export default router;