import { connect } from "mongoose";
import * as dotenv from "dotenv";

dotenv.config();

const connectToDB = async () => {
    try {
        const url: string = process.env.MONGO_DB_URL as string;
        await connect(url);
        console.log('Connected to DB successfully');
    } catch (error) {
        console.error('Could not connect to DB, try again', error);
    }
};

export default connectToDB;