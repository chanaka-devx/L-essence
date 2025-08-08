const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

// Import routes
const categoriesRoutes = require('./routes/categoryRoutes');
const dishesRoutes = require('./routes/dishRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/categories', categoriesRoutes);
app.use('/api/dishes', dishesRoutes);
app.use('/api/admins', adminRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to the L-essence backend!');
});

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});


// Request logging middleware (optional)
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
});