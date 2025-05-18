const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const app = express();
const connectDB = require('./db/db');
const userRoutes = require('./routes/user.route');
const captainRoutes = require('./routes/captain.routes');
const cookieParser = require('cookie-parser');
const mapsRoutes = require('./routes/maps.routes');
const rideRoutes = require('./routes/rides.routes');

// Database connection
connectDB();

// CORS configuration
const corsOptions = {
    origin: [
        'https://uber-clone-6qea.onrender.com',
        'http://localhost:5173'
    ],
    credentials: true,
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use('/maps', mapsRoutes);
app.use('/ride', rideRoutes);
app.use('/users', userRoutes);
app.use('/captain', captainRoutes);

// Health check endpoint
app.get('/', (req, res) => {
    res.status(200).json({
        status: 'healthy',
        timestamp: new Date()
    });
});

module.exports = app;