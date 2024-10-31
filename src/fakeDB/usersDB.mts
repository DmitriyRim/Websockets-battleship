import { WebSocket } from 'ws';

type User = {
  name: string;
  password: string;
  index: string | number;
};

type Winner = {
  name: string;
  wins: number;
};

type Room = {
  roomId: number | string;
  roomUsers: [
    {
      name: string;
      index: number | string;
    },
  ];
};

type Ships = {
  ships: [
    {
      position: {
        x: number;
        y: number;
      };
      direction: boolean;
      length: number;
      type: 'small' | 'medium' | 'large' | 'huge';
    },
  ];
  indexPlayer: number | string;
  ws: WebSocket;
}; /* id of the player in the current game session */

export const usersDB: User[] = [];
export const winnersDB: Winner[] = [];
export const roomsDB: Room[] = [];
export const activeUsers = new Map();
export const activeGameID = new Map();
export const activeGame: {
  [key: string | number]: Ships[];
} = {};
