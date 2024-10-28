import { activeUsers, roomsDB } from "../fakeDB/usersDB.mjs";
import { responseToString } from "../utils/utils.mjs";
import { TypeAction } from "./hendleMessage.mjs";
import { randomUUID } from 'node:crypto';
import { WebSocket } from 'ws';

export const createRoom = (ws: WebSocket) => {
    roomsDB.push({
        roomId: randomUUID(),
        roomUsers: [
            {
                ...activeUsers.get(ws)
            }
        ]
    })
}
export const updateRooms = () => {
    const availableRooms = roomsDB.filter(room => room.roomUsers.length < 2)
    return responseToString(TypeAction.UPDATE_ROOM, availableRooms)
}

export const addUserToRoom = (ws: WebSocket, data: string): boolean => {
    const indexRoom = JSON.parse(data).indexRoom;
    const room = roomsDB.find(item => item.roomId === indexRoom);
    const activeUser = activeUsers.get(ws);

    if(room?.roomUsers[0].index !== activeUser.index) {
        room?.roomUsers.push(activeUser);
        return true;
    }
    return false;
}