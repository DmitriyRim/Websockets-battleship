import { RawData, WebSocket, Server } from 'ws';
import { authorizationUser, updateWinners } from './hendleUser.mjs';
import { addUserToRoom, createRoom, updateRooms } from './hendleRooms.mjs';

export enum TypeAction {
  REG = 'reg',
  CREATE_GAME = 'create_game',
  CREATE_ROOM = 'create_room',
  UPDATE_WINNERS = 'update_winners',
  UPDATE_ROOM = 'update_room',
  ADD_USER_TO_ROOM = 'add_user_to_room'
}

export const message = (ws: WebSocket, wss: Server, data: RawData): void => {
  const request = JSON.parse(data.toString('utf8'));
  console.log('received: %s', request);
  
  switch (request.type) {
    case TypeAction.REG:
      ws.send(authorizationUser(request.data, ws));
      wss.clients.forEach(ws => {
        ws.send(updateRooms());
        ws.send(updateWinners());
      })
      break;
    case TypeAction.CREATE_ROOM:
      createRoom(ws);
      ws.send(updateRooms());
      break;
    case TypeAction.ADD_USER_TO_ROOM:
      if(addUserToRoom(ws, request.data)) {
        wss.clients.forEach(ws => {
          ws.send(updateRooms());
        })
      }
      break;
    // default:
    //   return '';
  }
};
