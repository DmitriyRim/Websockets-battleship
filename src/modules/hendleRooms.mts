import { activeUsers, roomsDB } from "../fakeDB/usersDB.mjs";
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
    return JSON.stringify({
        type: TypeAction.UPDATE_ROOM,
        data: JSON.stringify(roomsDB),
        id: 0,
    })
}