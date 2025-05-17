const SocketIo = require("socket.io");
const userModel = require("./models/user.model");
const captainModel = require("./models/caption.model");

let ioInstance;

function initializeSocket(server) {
    ioInstance = SocketIo(server, {
        cors: {
            origin: "*",
            methodas: ["GET", "POST"],
            // credentials: true
        }
    });

    ioInstance.on("connection", (socket) => {
        console.log("Client connected:", socket.id);

        socket.on("join", async(data) => {
            const { userId, role } = data;

            if (role === "user") {
                await userModel.findByIdAndUpdate(
                    userId, { socketId: socket.id }
                )
            } else if (role === "captain") {
                await captainModel.findByIdAndUpdate(
                    userId, { socketId: socket.id }
                );
            }


        });

        socket.on("disconnect", () => {
            console.log("Client disconnected:", socket.id);
        });
    });
}

function sendMessageToSocketId(socketId, message) {
    if (!ioInstance) {
        console.error("Socket.IO not initialized!");
        return;
    }
    ioInstance.to(socketId).emit('message', message);
}

module.exports = { initializeSocket, sendMessageToSocketId };