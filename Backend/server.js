const http = require('http');
const app = require('./app');
const { initializeSocket } = require('./socket');

const PORT = process.env.PORT || 3000; // Use Render's default port or 10000

// Create HTTP server
const server = http.createServer(app);

// Initialize Socket.IO
initializeSocket(server);

// Start server
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});