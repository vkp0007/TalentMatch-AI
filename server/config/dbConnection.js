import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

let cachedConnection = null;

const databaseConnection = async () => {
    if (cachedConnection) {
        return cachedConnection;
    }

    try {
        const connection = await mongoose.connect(
            process.env.MONGODB_URI,
            {
                dbName: process.env.DB_NAME
            }
        );

        cachedConnection = connection;

        console.log(
            `Database connected successfully to ${connection.connection.host}`
        );

        return connection;
    } catch (error) {
        console.error(
            `Database connection failed: ${error.message}`
        );

        throw error;
    }
};

export { databaseConnection };