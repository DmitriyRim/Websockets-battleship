import { randomUUID } from 'node:crypto';
import { activeUsers, usersDB, winnersDB } from '../fakeDB/usersDB.mjs';
import { TypeAction } from './hendleMessage.mjs';
import { WebSocket } from 'ws';
import { responseToString } from '../utils/utils.mjs';

type AuthUserData = {
  name: string;
  password: string;
};

export const authorizationUser = (request: string, ws: WebSocket) => {
  const data = JSON.parse(request);
  let user = usersDB.find((user) => user.name === data.name);
  let response = {};

  if (user === undefined) {
    createUser(data);
    user = usersDB[usersDB.length - 1];
  }

  if (user?.password === data.password) {
    response = {
      name: data.name,
      index: user.index,
      error: false,
      errorText: '',
    };

    activeUsers.set(ws, {
      name: data.name,
      index: user.index,
    })

  } else {
    response = {
      name: data.name,
      index: '',
      error: true,
      errorText: 'the password is incorrect',
    };
  }
  return responseToString(TypeAction.REG, response)
};

export const createUser = (data: AuthUserData) => {
  usersDB.push({
    ...data,
    index: randomUUID(),
  });
};

export const updateWinners = () => {
  return responseToString(TypeAction.UPDATE_WINNERS, winnersDB)
};
