const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const PORT = process.env.PORT || 5176;

// Import routes
const categoriesRoutes = require('./routes/categoryRoutes');

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware (optional)
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
});

// Routes
app.use('/api/categories', categoriesRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to the L-essence backend!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});