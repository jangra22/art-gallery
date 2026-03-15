const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Artwork = require('./models/Artwork');
const connectDB = require('./config/db');

dotenv.config();

connectDB();

const checkData = async () => {
    try {
        const userCount = await User.countDocuments();
        const artworkCount = await Artwork.countDocuments();
        
        console.log(`Users in DB: ${userCount}`);
        console.log(`Artworks in DB: ${artworkCount}`);
        
        if (userCount > 0) {
            const admin = await User.findOne({ email: 'admin@example.com' });
            console.log('Admin found:', admin ? 'Yes' : 'No');
            console.log('Admin Password Hash:', admin ? admin.password : 'N/A');
        }

        process.exit();
    } catch (error) {
        console.error('Error checking DB:', error);
        process.exit(1);
    }
};

checkData();
