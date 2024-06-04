import mongoose from "mongoose";


{/** timestamps: true is because we will need the time of creation and updating  */}
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }
}, {timestamps: true});

const User = mongoose.model('User', userSchema);

export default User;