const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const User = require('./models/User');
const connectDB = require('./config/db');

dotenv.config();

connectDB();

const checkLogin = async () => {
    try {
        const email = 'admin@example.com';
        const password = 'password123';

        const user = await User.findOne({ email });
        
        if (!user) {
            console.log('User not found');
            process.exit();
        }

        console.log('User found:', user.email);
        console.log('Stored Hash:', user.password);

        const isMatch = await bcrypt.compare(password, user.password);
        console.log('Password Match:', isMatch);
        
        // Let's also try to hash 'password123' manually and see
        const salt = await bcrypt.genSalt(10);
        const newHash = await bcrypt.hash(password, salt);
        console.log('New Hash of password123:', newHash);

        process.exit();
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

checkLogin();
