import mongoose from "mongoose";


{/** timestamps: true is because we will need the time of creation and updating  */}
const listingSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    address:{
        type: String,
        required: true,
    },
    regularPrice:{
        type: Number,
        required: true,
    },
    discountPrice:{
        type: Number,
        required: true,
    },
    bathrooms:{
        type: Number,
        required: true,
    },
    bedrooms:{
        type: Number,
        required: true,
    },
    furnished:{
        type: String,
        required: true,
    },
    parking:{
        type: Boolean,
        required: true,
    },
    type:{
        type: String,
        required: true,
    },
    offer:{
        type: Boolean,
        required: true,
    },
    imageUrls:{
        type: Array,
        required: true,
    },
    userRef:{
        type: String,
        required: true,
    },
    houseShare:{
        type: Boolean,
        required: true,
    },
    houseShareBedrooms:{
        type: Number,
        required: true,
    },
}, {timestamps: true});

const Listing = mongoose.model('Listing', listingSchema);

export default Listing;