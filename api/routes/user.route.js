import express, { Router } from 'express';
import { updateUser, userTest, deleteUser, getUserListing, getUserInfo } from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.get('/test', userTest);
router.post('/update/:id', verifyToken, updateUser);
router.delete('/delete/:id', verifyToken, deleteUser);
router.get('/listings/:id', verifyToken, getUserListing);
router.get('/getinfo/:id', getUserInfo);


export default router;