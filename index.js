const express = require('express');
const cors = require('cors');
require('dotenv').config();
const PORT = process.env.PORT || 8000;
const connectDB = require('./config/db');
const blogRouter = require('./routes/BloggerRoute');
const app = express();

// CORS configuration with additional options
app.use(cors({
  origin: 'https://chaabi-ai-frontend.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow the necessary methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow headers
  credentials: true // Use credentials if needed (cookies, headers)
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/blog', blogRouter);

connectDB();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
