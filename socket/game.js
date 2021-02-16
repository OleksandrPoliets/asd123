import * as config from "./config";
import { isExistUser, saveUser, deleteUser } from '../socketHelpers/loginHelper'
import {
    isExistRoom,
    createRoom,
    conectToRoom,
    getOllRooms,
    conectToGameRoom,
    changeUserStatus,
    getRoomPlayers,
    getUserByName,
    leaveRoom,
    prepareToRide
} from '../socketHelpers/createRoom'


export default io => {
    io.on("connection", socket => {
        const { username, id } =  socket.handshake.query;
        const isExist = isExistUser(username);
        console.log(username, id)
        if (isExist) {
            socket.emit('NAME_IS_EXIST', 'Name is Exist');
        } else{
            saveUser(username, id);
        }

        socket.on("CREATE_ROOM", roomName => {
            const isExist = isExistRoom(roomName);
            if (isExist) {
                socket.emit("ROOM_IS_EXIST", false);
                return;
            } else {
                socket.join(roomName);
                createRoom(roomName);
                conectToRoom(roomName, username);
                conectToGameRoom(username, roomName);
                const users = getRoomPlayers(roomName);
                socket.emit("JOIN_OK", { roomName, users});
                socket.broadcast.emit("UPDATE_ROOMS", getOllRooms());
            }
        });

        socket.emit("UPDATE_ROOMS", getOllRooms());

        socket.on("JOIN_TO_ROOM", roomId => {
            const users = getRoomPlayers(roomId);
            conectToRoom(roomId, username);
            conectToGameRoom(username, roomId);
            socket.join(roomId);
            socket.emit("JOIN_OK", { roomName: roomId, users});
            socket.broadcast.emit("UPDATE_ROOMS", getOllRooms());
            socket.to(roomId).emit("UPDATE_GAME_ROOM", getUserByName(username, roomId));
        });

        socket.on("LEAVE_GAME", ({gameRoom, username}) => {
            socket.leave(gameRoom);
            const onGame = leaveRoom(username, gameRoom);
            if (onGame) {
                socket.to(gameRoom).emit("PREPARE_TO_RIDE", config.SECONDS_TIMER_BEFORE_START_GAME);
            }
            socket.emit("UPDATE_ROOMS", getOllRooms());
            socket.to(gameRoom).emit("DELETE_USER", username);
        });

        socket.on("USER_STATUS", ({gameRoom, username}) => {
            const onGame = changeUserStatus(username, gameRoom);
            if (onGame) {
                io.to(gameRoom).emit("PREPARE_TO_RIDE", config.SECONDS_TIMER_BEFORE_START_GAME);
            }
            socket.to(gameRoom).emit("UPDATE_USER_STATUS", {username});
        });

        socket.on("disconnect", () => {
            deleteUser(username, id);
        });
    });
};
