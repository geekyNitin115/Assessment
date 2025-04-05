import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        // Get MongoDB URI from environment variables
        const mongoURI = process.env.MONGO_URI;
        
        if (!mongoURI) {
            throw new Error('MongoDB URI is not defined in environment variables');
        }

        // Connect to MongoDB
        const conn = await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`MongoDB connection error: ${error.message}`);
        process.exit(1);
    }
};

export default connectDB; 