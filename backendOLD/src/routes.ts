import express from 'express';
import { ethers } from 'ethers';
import { getBlockNumbers, createSigner, createProvider } from './script';
import cors from 'cors';
import { getSwap } from './contracts';
import fs from 'fs';

const { settings } = require('./script');
const app = express();
const PRIVATE_KEY_1: string = process.env.PRIVATE_KEY_1 || "";
const PRIVATE_KEY_2: string = process.env.PRIVATE_KEY_2 || "";

app.use(cors());

app.use(express.json()); // Parse JSON bodies

app.get('/blocks', async (req, res) => {
  try {
    const result = await getBlockNumbers();
    res.send(result);
  } catch (error) {
    res.status(500).send({ error: (error as Error).message });
  }
});

app.post('/wallet', async (req, res) => {
  try {
    const provider = await createProvider(settings.apiKey);
    const wallet = await createSigner(PRIVATE_KEY_1, provider);

    console.log("Wallet Address: ", wallet.address);
    console.log("Provider: ", wallet.provider);

    res.send(`privateKey: ${wallet.privateKey}`);
  } catch (error) {
    res.status(500).send({ error: (error as Error).message });
  }
});

app.get('/balance', async (req, res) => {
  try {
    const provider = await createProvider(settings.apiKey);
    const wallet = await createSigner(PRIVATE_KEY_1, provider);

    const balance = await provider.getBalance(wallet.address);
    console.log(balance.toString());

    const newBalance = ethers.formatEther(balance);
    console.log(newBalance);

    res.send({ balance: newBalance + ` ${settings.network.toUpperCase()}` });
  } catch (error) {
    res.status(500).send({ error: (error as Error).message });
  }
});

app.post("/send", async (req, res) => {
  try {
    const { to, amount } = req.body;
    if (!to || !amount) {
      return res.status(400).send({ error: "Missing 'to' or 'amount' in request body" });
    }

    const senderProvider = await createProvider(settings.apiKey);
    const senderWallet = await createSigner(PRIVATE_KEY_1, senderProvider);

    const tx = {
      to: to,
      value: ethers.parseEther(amount.toString()),
    };

    const txResponse = await senderWallet.sendTransaction(tx);
    console.log("Transaction hash:", txResponse.hash);

    res.send({ transactionHash: txResponse.hash });
  } catch (error) {
    res.status(500).send({ error: (error as Error).message });
  }
});

app.get('/swap', async (req, res) => {
  try {
    
    const obj = await getSwap();
    console.log(obj, 'obj');
    
    const filePath = './src/data/swapEventDB.json';
    const swapEventData = fs.readFileSync(filePath, 'utf8');

    res.send(swapEventData);
  } catch (error) {
    console.error('Error fetching swap events:', error);
    res.status(500).send({ error: 'Error fetching swap events' });
  }
});

export default app;
