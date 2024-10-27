import { randomUUID } from 'node:crypto';
import { usersDB } from '../fakeDB/usersDB.mjs';

type AuthUserData = {
  name: string;
  password: string;
};

export const authorizationUser = (request: string) => {
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
  } else {
    response = {
      name: data.name,
      index: '',
      error: true,
      errorText: 'the password is incorrect',
    };
  }

  return JSON.stringify({ type: 'reg', data: JSON.stringify(response), id: 0 });
};

export const createUser = (data: AuthUserData) => {
  usersDB.push({
    ...data,
    index: randomUUID(),
  });
};
