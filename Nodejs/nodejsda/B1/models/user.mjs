import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userScheme = new Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String
    },
    password: {
        type: String,
        minLength: 9,
    },
    age: {
        type: Number
    },
    workExperience: {
        type: Array(Object)
    },
    role: {
        type: String,
        default: "User",
        enum: ['Admin', 'User'],
    }
});

const User = mongoose.model("user", userScheme); //==> users

export default User;