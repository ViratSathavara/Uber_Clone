const http = require("http");
const app = require("./app");
const { initializeSocket } = require("./socket");

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT || 10000, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});

// attach Socket.IO
initializeSocket(server);

server.listen();