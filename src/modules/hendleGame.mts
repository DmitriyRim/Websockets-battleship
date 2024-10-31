import { activeGame, activeGameID, activeUsers, roomsDB } from '../fakeDB/usersDB.mjs';
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

  activeGameID.set(ws, gameId);

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

    const users = activeGame[`${gameId}`].map((userShips) => {
      userShips.ws.send(
        responseToString(TypeAction.START_GAME, {
          ships: userShips.ships,
          currentPlayerIndex: userShips.indexPlayer,
        }),
      );
      return userShips.indexPlayer
    });

    turn(ws, users[Math.round(Math.random())])
  }

};

export const turn = (ws: WebSocket, currentPlayer: string | number) => {
    const gameId = activeGameID.get(ws);
    const usersId = activeGame[`${gameId}`].map(user => user.indexPlayer);
    const nextPlayer = currentPlayer === usersId[0] ? usersId[1] : usersId[0];
 
    activeGame[`${gameId}`].forEach((userShips) => {
        userShips.ws.send(
          responseToString(TypeAction.TURN, { currentPlayer: nextPlayer }),
        );
    });
    console.log(responseToString(TypeAction.TURN, { currentPlayer: nextPlayer }))
}