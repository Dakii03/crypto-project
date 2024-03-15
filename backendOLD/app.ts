import app from './src/routes';
import cors from 'cors';
import { getSwap } from './src/contracts';

const PORT: number = Number(process.env.PORT) || Number("");

app.use(cors());

const server = app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

process.stdin.on('data', (input: Buffer) => {
  const command: string = input.toString().trim(); // Trim whitespace from the input

  if (command === 'close') {
    console.log('Closing the server...');
    server.close(() => {
      console.log('Server closed.');
      console.log('Executing getSwap function...');
      getSwap();
    });
  }
});
