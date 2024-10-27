import { RawData } from 'ws';
import { authorizationUser } from './hendleUser.mjs';

enum TypeAction {
  REG = 'reg',
}

export const message = (data: RawData): string => {
  const request = JSON.parse(data.toString('utf8'));
  console.log('received: %s', request);
  switch (request.type) {
    case TypeAction.REG:
      return authorizationUser(request.data);
    default:
      return '';
  }
};
