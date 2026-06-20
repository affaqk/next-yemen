import mongoose from "mongoose";

const Connection = async () => {
    if (mongoose.connection.readyState >= 1) return;
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("Connection successful")
    } catch (error) {
        console.log(error)
    }
}

export default Connection