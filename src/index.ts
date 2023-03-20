import readline from 'readline';
import WebSocket from 'ws';

const client = new WebSocket('ws://localhost:8000');

client.on('open', () => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  // ループでプロンプトから文字を受け付ける
  const prompt = () => {
    rl.question('message: ', (input) => {
      // 入力された文字列をWebSocketサーバーに送信する
      client.send(input);
      prompt();
    });
  };
  prompt();
});

client.on('message', (message) => {
  console.log(`Received message: ${message}`);
});
