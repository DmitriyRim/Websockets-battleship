import { activeUsers, roomsDB } from "../fakeDB/usersDB.mjs";
import { responseToString } from "../utils/utils.mjs"
import { TypeAction } from "./hendleMessage.mjs"
import { randomUUID } from 'node:crypto';
import { WebSocket, Server } from 'ws';

export const createGame = (wss: Server, ws: WebSocket) => {
    const idGame = randomUUID();
    const currentUserId = activeUsers.get(ws).index;
    const currentRoom = roomsDB.filter(room => {
        return room.roomUsers.find(user => user.index === currentUserId) ? true : false;
    })

    if(currentRoom.length === 1) {
        currentRoom[0].roomUsers.forEach(user => {
            wss.clients.forEach(client => {
                if(activeUsers.get(client).index === user.index){
                    client.send(responseToString(TypeAction.CREATE_GAME, {idGame, idPlayer: randomUUID()}))
                }
            })

        })

    }
}


// {
//     type: "create_game", //отправить сообщение для обоих игроков, находящихся в комнате, после того, как они будут подключены к комнате
//     data:
//         {
//             idGame: <number | string>,  
//             idPlayer: <number | string>, /* генерируется идентификатором сервера для игрока в игровой сессии, а не для противника (уникальный идентификатор для каждого игрока) */ }, id: 0, }
//         },
//     id: 0,
// }