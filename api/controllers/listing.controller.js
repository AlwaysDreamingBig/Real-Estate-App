import Listing from "../models/listing.model.js";
import { errorHandler } from "../utils/error.js";

export const createListing = async (req, res, next) => {
  const { name, address, description, imageUrls, regularPrice, discountPrice } = req.body;

  try {
    // Check if name, address, description, or imageUrls are empty
    if (!name) {
      return res.status(400).json({ message: "Name is required." });
    }
    if (!address) {
      return res.status(400).json({ message: "Address is required." });
    }
    if (!description) {
      return res.status(400).json({ message: "Description is required." });
    }
    if (!imageUrls || imageUrls.length === 0) {
      return res.status(400).json({ message: "Images are required." });
    }

    // Convert prices to numbers if they are strings
    const regularPriceNum = Number(regularPrice);
    const discountPriceNum = Number(discountPrice);

    // Check if regularPrice or discountPrice are missing or invalid
    if (isNaN(regularPriceNum) || regularPriceNum <= 0) {
      return res.status(400).json({ message: "Regular price must be a positive number." });
    }
    if (isNaN(discountPriceNum) || discountPriceNum <= 0) {
      return res.status(400).json({ message: "Discount price must be a positive number." });
    }
    if (discountPriceNum >= regularPriceNum) {
      return res.status(400).json({ message: "Discount price must be less than regular price." });
    }

    // Continue with listing creation if all required fields are provided
    const listing = await Listing.create(req.body);

    return res.status(201).json(listing);
  } catch (error) {
    next(error);
  }
};

export const deleteListing = async (req, res, next) => {

    // Ensure the listing belongs to the user making the request
    const listing = await Listing.findById(req.params.id);

    if(!listing){
      return next(errorHandler(404, 'Listing was not found!'))
    }

    if(req.user.id !== listing.userRef){
      return next(errorHandler(404, 'You can only delete your own listing'))
    }

    try {

      await Listing.findByIdAndDelete(req.params.id);

      return res.status(200).json({ message: "Listing deleted successfully." });
   
    } catch (error) {
        next(error)
    }
};