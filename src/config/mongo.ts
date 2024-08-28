import { config } from 'dotenv';
import { connect } from 'mongoose';

config();

const connectDB = async () => {
    const DB_URI = <string>process.env.DB_URI;
    await connect(DB_URI);
}

export default connectDB;