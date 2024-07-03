import express from 'express';
import { createListing, deleteListing, getListing, updateListing } from '../controllers/listing.controller.js';
import { verifyToken } from '../utils/verifyUser.js';


const router = express.Router();

router.post("/create/:id", verifyToken, createListing);
router.delete("/delete/:id", verifyToken, deleteListing);
router.post("/update/:id", verifyToken, updateListing);
router.get("/getListing/:id", getListing);



export default router;