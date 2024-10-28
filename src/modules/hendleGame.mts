import { activeGame, activeUsers, roomsDB } from '../fakeDB/usersDB.mjs';
import { responseToString } from '../utils/utils.mjs';
import { TypeAction } from './hendleMessage.mjs';
import { randomUUID } from 'node:crypto';
import { WebSocket, Server } from 'ws';

export const createGame = (wss: Server, ws: WebSocket) => {
  const idGame = randomUUID();
  const currentUserId = activeUsers.get(ws).index;
  const currentRoom = roomsDB.filter((room) => {
    return room.roomUsers.find((user) => user.index === currentUserId)
      ? true
      : false;
  });

  if (currentRoom.length === 1) {
    currentRoom[0].roomUsers.forEach((user) => {
      wss.clients.forEach((client) => {
        if (activeUsers.get(client).index === user.index) {
          client.send(
            responseToString(TypeAction.CREATE_GAME, {
              idGame,
              idPlayer: randomUUID(),
            }),
          );
        }
      });
    });
  }
};

export const addShips = (ws: WebSocket, data: string) => {
  const userShips = JSON.parse(data);
  const { gameId, ships, indexPlayer } = userShips;

  if (!Object.keys(activeGame).includes(gameId)) {
    activeGame[`${gameId}`] = [
      {
        indexPlayer,
        ships,
        ws,
      },
    ];
  } else {
    activeGame[`${gameId}`].push({
      indexPlayer,
      ships,
      ws,
    });
    activeGame[`${gameId}`].forEach((userShips) => {
      userShips.ws.send(
        responseToString(TypeAction.START_GAME, {
          ships: userShips.ships,
          currentPlayerIndex: userShips.indexPlayer,
        }),
      );
    });
  }
};

// type Ships = {
//     gameId: number | string,
//     ships: [
//                 {
//                     position: {
//                         x: number,
//                         y: number,
//                     },
//                     direction: boolean,
//                     length: number,
//                     type: "small"|"medium"|"large"|"huge",
//                 }
//             ],
//     indexPlayer: number | string, /* id of the player in the current game session */
// }
