import { WebSocketServer } from 'ws';
import { message } from '../modules/hendleMessage.mjs';

const wss = new WebSocketServer({ port: 3000 }, () => {
  console.log('Start WebSocketServer on the 3000 port!');
});

wss.on('connection', function connection(ws) {
  console.log('WebSocket server Connected');
  ws.on('error', console.error);

  ws.on('message', (data) => {
    ws.send(message(data));
  });

  ws.send(JSON.stringify('s'));
});
