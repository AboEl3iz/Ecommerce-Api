import mongoose from 'mongoose';

export default   async () => {
    try {
        await mongoose.connect(process.env.MONGOURL as string);
        console.log('Database connected successfully');
    } catch (error) {
        console.log('Database connection failed');
    }
};