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

connectDB();

app.use(cors({
    origin: [process.env.FRONTEND_HOSTED_URL],
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/maps', mapsRoutes);
app.use('/ride', rideRoutes);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/users', userRoutes);
app.use('/captain', captainRoutes);

module.exports = app;