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
      return next(errorHandler(406, 'You can only delete your own listing'))
    }

    try {

      await Listing.findByIdAndDelete(req.params.id);

      return res.status(200).json({ message: "Listing deleted successfully." });
   
    } catch (error) {
        next(error)
    }
};

export const updateListing = async (req, res, next) => {

  // Ensure the listing belongs to the user making the request
  const listing = await Listing.findById(req.params.id);

  if(!listing){
    return next(errorHandler(404, 'Listing was not found!'))
  }

  if(req.user.id !== listing.userRef){
    return next(errorHandler(406, 'You can only update your own listing'))
  }

  try {

    const updatedListing = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      {new: true}
    );

    return res.status(200).json(updatedListing);
 
  } catch (error) {
      next(error)
  }
};

export const getListing = async (req, res, next) => {

  try {

        // Ensure the listing belongs to the user making the request
    const listing = await Listing.findById(req.params.id);

    if(!listing){
      return next(errorHandler(404, 'Listing was not found!'));
    }

    return res.status(200).json(listing);
 
  } catch (error) {
      next(error)
  }
};

export const searchListings = async (req, res, next) => {
  try {
    // Limit and startIndex for pagination with default values
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = parseInt(req.query.startIndex, 10) || 0;

    // Offer filter with default value
    let offer = req.query.offer;
    if (offer === undefined || offer === 'false') {
      offer = { $in: [true, false] };
    } else {
      offer = { $eq: true };
    }

    // Parking filter with default value
    let parking = req.query.parking;
    if (parking === undefined || parking === 'false') {
      parking = { $in: [true, false] };
    } else {
      parking = { $eq: true };
    }

    // Search term with regex for case-insensitive search
    const searchTerm = req.query.searchTerm || '';

    // Sort field and order
    const sort = req.query.sort || 'createdAt';
    const order = req.query.order === 'asc' ? 1 : -1;

    // Price range filtering
    const minPrice = parseFloat(req.query.minPrice) || 0;
    const maxPrice = parseFloat(req.query.maxPrice) || Number.MAX_VALUE;

    // City and country filtering
    const city = req.query.city || '';
    const country = req.query.country || '';

    // Construct address regex with optional city and country
    let addressRegex = '';
    if (city && country) {
      addressRegex = `${city}(?:.*?,\\s*|\\s+.*?\\s+)?${country}`;
    } else if (city) {
      addressRegex = `${city}`;
    } else if (country) {
      addressRegex = `${country}`;
    }

    // Bathroom, bedroom, and houseShareBedrooms filters
    const minBathrooms = parseInt(req.query.minBathrooms, 10) || 0;
    const maxBathrooms = parseInt(req.query.maxBathrooms, 10) || Number.MAX_VALUE;
    const minBedrooms = parseInt(req.query.minBedrooms, 10) || 0;
    const maxBedrooms = parseInt(req.query.maxBedrooms, 10) || Number.MAX_VALUE;
    const minHouseShareBedrooms = parseInt(req.query.minHouseShareBedrooms, 10) || 0;
    const maxHouseShareBedrooms = parseInt(req.query.maxHouseShareBedrooms, 10) || Number.MAX_VALUE;

    // Type filter
    const type = req.query.type || '';

    // Additional boolean feature filters
    const booleanFilters = {};
    const booleanFields = [
      'unisexBathroom', 'sharedLivingRoom', 'sharedGarden', 'sharedToilet', 
      'sharedKitchen', 'sharedBalcony', 'gasHeating', 'sharedKitchenware', 
      'wifi', 'livingRoomFurniture', 'bed', 'tv', 'bedroomLock', 
      'washingMachine', 'dryer', 'closet', 'desk', 'airConditioning', 
      'dishwasher', 'accessFriendly'
    ];

    booleanFields.forEach(field => {
      const value = req.query[field];
      if (value === 'true') {
        booleanFilters[field] = true;
      } else if (value === 'false') {
        booleanFilters[field] = false;
      }
      // If value is undefined, it is not added to the query
    });

    // Construct query
    const query = {
      name: { $regex: searchTerm, $options: 'i' },
      offer,
      parking,
      regularPrice: { $gte: minPrice, $lte: maxPrice },
      address: { $regex: addressRegex, $options: 'i' },
      bathrooms: { $gte: minBathrooms, $lte: maxBathrooms },
      bedrooms: { $gte: minBedrooms, $lte: maxBedrooms },
      houseShareBedrooms: { $gte: minHouseShareBedrooms, $lte: maxHouseShareBedrooms },
      type: type ? { $regex: type, $options: 'i' } : { $exists: true }, // Handle type filter
      ...booleanFilters, // Spread the boolean feature filters into the query
    };

    // Find listings with filters, sorting, and pagination
    const listings = await Listing.find(query)
      .sort({ [sort]: order })
      .limit(limit)
      .skip(startIndex);

    // Return the listings
    return res.status(200).json(listings);
  } catch (error) {
    // Improved error handling
    return res.status(500).json({ message: 'An error occurred while searching for listings.', error: error.message });
  }
};


