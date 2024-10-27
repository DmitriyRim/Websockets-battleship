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
    return responseToString(TypeAction.UPDATE_ROOM, roomsDB)
}

export const addUserToRoom = () => {

}