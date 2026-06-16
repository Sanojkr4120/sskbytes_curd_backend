import mongoose from 'mongoose';

// This function tries to connect our code to the MongoDB database
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected`);
    } catch (error) {
        // If it fails, we show what went wrong
        console.error(`Database connection failed: ${error.message}`);
        process.exit(1);
    }
};

export default connectDB;
