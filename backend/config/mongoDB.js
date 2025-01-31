import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(`${process.env.MONGO_URI}/project_db`);
        console.log("Connected db with " + conn.connection.host);
    } catch (error) {
        console.log("Error is " + error.message);
        process.exit(1);
    }
}

export default connectDB