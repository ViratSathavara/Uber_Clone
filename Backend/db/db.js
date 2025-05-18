// const mongoose = require('mongoose');


// function connectDB() {
//   mongoose.connect(process.env.MONGO_URI)
//   .then(() => console.log('MongoDB connected'))
//   .catch(err => console.error('MongoDB connection error:', err));
// }

// module.exports = connectDB;

const mongoose = require('mongoose');

async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
            maxPoolSize: 10, // Maximum number of sockets in the connection pool
        });
        console.log('MongoDB connected successfully');

        // Listen for connection events
        mongoose.connection.on('connected', () => {
            console.log('Mongoose connected to DB');
        });

        mongoose.connection.on('error', (err) => {
            console.error('Mongoose connection error:', err);
        });

        mongoose.connection.on('disconnected', () => {
            console.log('Mongoose disconnected');
        });

    } catch (err) {
        console.error('MongoDB initial connection error:', err);
        process.exit(1); // Exit process with failure
    }
}

module.exports = connectDB;