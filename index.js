const express = require('express');
const cors = require('cors');
require('dotenv').config();
const PORT = process.env.PORT || 8000;
const connectDB = require('./config/db');
const blogRouter = require('./routes/BloggerRoute');
const app = express();

app.use(cors(
    { origin: 'http://localhost:5173', credentials: true } 
));

app.use(express.urlencoded({ extended: true }))
app.use(express.json());

app.use('/api/blog', blogRouter);

connectDB();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
