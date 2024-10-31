# RSSchool NodeJS websocket task template
> Static http server and base task packages. 
> By default WebSocket client tries to connect to the 3000 port.

## Installation
1. Clone/download repo
2. `npm install`

## Usage
**Development**

`npm run start:dev`

* App served @ `http://localhost:8181` with nodemon

**Production**

`npm run start`

* App served @ `http://localhost:8181` without nodemon

**websocket server**

`npm run start:ts`

* App served @ `http://localhost:3000` without nodemon
---

**All commands**

Command | Description
--- | ---
`npm run start:dev` | App served @ `http://localhost:8181` with nodemon
`npm run start` | App served @ `http://localhost:8181` without nodemon
`npm run start:ts` | Websocket server @ `http://localhost:3000` without nodemon

**Note**: replace `npm` with `yarn` in `package.json` if you use yarn.
