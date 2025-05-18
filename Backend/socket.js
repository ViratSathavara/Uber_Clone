const SocketIo = require("socket.io");
const userModel = require("./models/user.model");
const captainModel = require("./models/captain.model");

let ioInstance;

function initializeSocket(server) {
    ioInstance = SocketIo(server, {
        cors: {
            origin: ['https://uber-clone-6qea.onrender.com',
                'http://localhost:5173'
            ],
            methodas: ["GET", "POST"],
            credentials: true,
        }
    });

    ioInstance.on("connection", (socket) => {
        console.log("Client connected:", socket.id);

        socket.on("join", async(data) => {
            const { captainId, userId, userType } = data;

            if (userType === "user") {
                await userModel.findByIdAndUpdate(
                    userId, { socketId: socket.id }
                )
            } else if (userType === "captain") {
                await captainModel.findByIdAndUpdate(
                    captainId, { socketId: socket.id }
                );
            }
        });

        socket.on("update-location-captain", async(data) => {
            const { captainId, location } = data;
            if (!location ||
                typeof location.ltd !== "number" ||
                typeof location.lng !== "number"
            ) {
                socket.emit("error", { message: "Invalid location data" });
                return;
            }
            await captainModel.findByIdAndUpdate(
                captainId, {
                    location: {
                        ltd: location.ltd,
                        long: location.lng
                    }
                }
            );

        })

        socket.on("disconnect", () => {
            console.log("Client disconnected:", socket.id);
        });
    });
}

function sendMessageToSocketId(socketId, messageObject) {
    if (!ioInstance) {
        console.error("Socket.IO not initialized!");
        return;
    }
    ioInstance.to(socketId).emit(messageObject.event, messageObject.data);
}

module.exports = { initializeSocket, sendMessageToSocketId };