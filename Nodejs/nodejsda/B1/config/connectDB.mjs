import mongoose from "mongoose";

export function connectDB() {
    mongoose
        .connect("mongodb://localhost:27017/demo1024")
        .then(() => console.log("Connected!"));
}
//