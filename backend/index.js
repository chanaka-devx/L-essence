const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');

// Force development mode for local running
process.env.NODE_ENV = 'development';
dotenv.config();

// Import routes
const categoriesRoutes = require('./routes/categoryRoutes');
const dishesRoutes = require('./routes/dishRoutes');
const adminRoutes = require('./routes/adminRoutes');
const userRoutes = require('./routes/userRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const timeSlotRoutes = require('./routes/timeSlotRoutes');
const tableRoutes = require('./routes/tableRoutes');
const adminStatRoutes = require('./routes/adminStatRoutes')

const app = express();
app.use(cors(
    {
        origin: "*",
        credentials: false,
    }
));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
});

// Routes
app.use('/api/categories', categoriesRoutes);
app.use('/api/dishes', dishesRoutes);
app.use('/api/users', userRoutes);
app.use('/api/admins', adminRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/timeslots', timeSlotRoutes);
app.use('/api/tables', tableRoutes);
app.use('/api/admin', adminStatRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to the L-essence backend!');
});

// Start the server
const PORT = process.env.PORT || 5176;
app.listen(PORT, () => {
    console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

// For Vercel serverless deployment
module.exports = app;