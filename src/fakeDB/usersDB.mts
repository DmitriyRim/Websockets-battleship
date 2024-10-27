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

export const usersDB: User[] = [];
export const winnersDB: Winner[] = [];
export const roomsDB: Room[] = [];
export const activeUsers = new Map();