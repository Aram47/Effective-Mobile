import mongoose from "mongoose";
import { logger } from "../utils/logger.js";

export default async function connectDB() {
    try {
        await mongoose.connect(process.env.DATABASE_URL!);
        logger.info('MongoDB connected');
    } catch (err) {
        console.error('MongoDb connection failed', err);
        process.exit(1);
    }
}