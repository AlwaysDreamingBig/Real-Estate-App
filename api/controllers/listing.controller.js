import Listing from "../models/listing.model.js";

export const createListing = async (req, res, next) => {
  const { name, address, description, imageUrls, regularPrice, discountPrice } = req.body;

  try {
    // Check if name, address, description, or imageUrls are empty
    if (!name) {
      return res.status(411).json({ message: "Name is required." });
    }
    if (!address) {
      return res.status(411).json({ message: "Address is required." });
    }
    if (!description) {
      return res.status(411).json({ message: "Description is required." });
    }
    if (!imageUrls || imageUrls.length === 0) {
      return res.status(411).json({ message: "Images are required." });
    }
    // Check if regularPrice or discountPrice are missing or invalid
    if (!regularPrice || isNaN(regularPrice) || regularPrice <= 0) {
        return res.status(411).json({ message: "Regular price must be a positive number." });
    }
      if (!discountPrice || isNaN(discountPrice) || discountPrice <= 0) {
        return res.status(411).json({ message: "Discount price must be a positive number." });
    }
      if (discountPrice >= regularPrice) {
        return res.status(411).json({ message: "Discount price must be less than regular price." });
    }
    if (discountPrice >= regularPrice) {
        return res.status(411).json({ message: "Discount price must be less than regular price." });
    }

    // Continue with listing creation if all required fields are provided
    const listing = await Listing.create(req.body);

    return res.status(201).json(listing);
  } catch (error) {
    next(error);
  }
};
