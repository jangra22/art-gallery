const mongoose = require('mongoose');
const dotenv = require('dotenv');
const users = require('./data/users');
const artworks = require('./data/artworks');
const User = require('./models/User');
const Artwork = require('./models/Artwork');
const connectDB = require('./config/db');

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await User.deleteMany();
    await Artwork.deleteMany();

    for (const user of users) {
        await User.create(user);
    }

    for (const artwork of artworks) {
        await Artwork.create(artwork);
    }
    
    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
