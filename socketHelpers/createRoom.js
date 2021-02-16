import * as config from "../socket/config";

const roomsName = new Map();

export const isExistRoom = room => {
    const isExist = roomsName.has(room);
    return isExist;
}

export const createRoom = room => {
    roomsName.set(room, {
        roomName: room,
        conectedUsers: [],
        usersStatus: [],
        onGame: false,
        isMaxPlayer: false
    });

};

export const conectToGameRoom = (user, room) => {
    const tempRoom = roomsName.get(room);
    tempRoom.usersStatus.push({
        userName: user,
        userIsReady: false,
        userScore: 0
    });
    roomsName.set(room, tempRoom);
};

const isOllReady = room => {
    const tempRoom = roomsName.get(room);
    const readyCounter = tempRoom.usersStatus.reduce((sum, curent) => {
        return sum + curent.userIsReady
    },0);

    if(tempRoom.usersStatus.length >= config.MINIMUM_USERS_FOR_ONE_ROOM && readyCounter === tempRoom.usersStatus.length){
        tempRoom.onGame = true;
        roomsName.set(room, tempRoom);
    }
}

export const changeUserStatus = (user, room) => {
    const tempRoom = roomsName.get(room);
    tempRoom.usersStatus.map(el => {
        if (el.userName === user) {
            el.userIsReady = !el.userIsReady;
        }
    });
    isOllReady(room);
    roomsName.set(room, tempRoom);

    return tempRoom.onGame;
};

export const leaveRoom = (user, room) => {
    const tempRoom = roomsName.get(room);
    const conectedUsers = tempRoom.conectedUsers.filter(el => el !==user);
    const statusUsers = tempRoom.usersStatus.filter(el => el.userName !==user);
    tempRoom.conectedUsers = conectedUsers;
    tempRoom.usersStatus = statusUsers;
    roomsName.set(room, tempRoom);
    isOllReady(room);

    return tempRoom.onGame;
}

export const getUserByName = (user, room) => {
    const tempRoom = roomsName.get(room);
    const carentUser = tempRoom.usersStatus.find(el => el.userName === user);

    return carentUser;
}

export const getRoomPlayers = room => {
    const tempRoom = roomsName.get(room);

    return tempRoom.usersStatus;
}

export const conectToRoom = (room, user) => {
    const getCarrentRoom = roomsName.get(room);

    if (getCarrentRoom.conectedUsers.length === config.MAXIMUM_USERS_FOR_ONE_ROOM) {
        getCarrentRoom.isMaxPlayer = true;
    }
    if (!getCarrentRoom.onGame && !getCarrentRoom.isMaxPlayer){
        getCarrentRoom.conectedUsers.push(user);
    }

    roomsName.set(room, {...getCarrentRoom});
}


export const getOllRooms = () => {
    let result = [];
    roomsName.forEach((value) => result.push(value));

    return result;
}

export const prepareToRide = async () => {
    const finish = true;
    await setTimeout( ()=>{
        return finish
    }, config.SECONDS_TIMER_BEFORE_START_GAME * 100);


}

