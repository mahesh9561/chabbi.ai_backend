const mongoose = require('mongoose');
const { DB_URL } = require('./key');

// const connectDB = mongoose.connect()
const connectDB = async () => {
    try {
        await mongoose.connect(DB_URL);
        console.log('MongoDB Connected...');
    } catch (error) {
        console.log(error)
    }
}
module.exports = connectDB;