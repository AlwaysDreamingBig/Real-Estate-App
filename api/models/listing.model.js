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
        type: Boolean,
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
    userName:{
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
    unisexBathroom: { type: Boolean, default: false },
    sharedLivingRoom: { type: Boolean, default: false },
    sharedGarden: { type: Boolean, default: false },
    sharedToilet: { type: Boolean, default: false },
    sharedKitchen: { type: Boolean, default: false },
    sharedBalcony: { type: Boolean, default: false },
    gasHeating: { type: Boolean, default: false },
    sharedKitchenware: { type: Boolean, default: false },
    wifi: { type: Boolean, default: false },
    livingRoomFurniture: { type: Boolean, default: false },
    bed: { type: Boolean, default: false },
    tv: { type: Boolean, default: false },
    bedroomLock: { type: Boolean, default: false },
    washingMachine: { type: Boolean, default: false },
    dryer: { type: Boolean, default: false },
    closet: { type: Boolean, default: false },
    desk: { type: Boolean, default: false },
    airConditioning: { type: Boolean, default: false },
    dishwasher: { type: Boolean, default: false },
    accessFriendly: { type: Boolean, default: false },
}, {timestamps: true});

const Listing = mongoose.model('Listing', listingSchema);

export default Listing;