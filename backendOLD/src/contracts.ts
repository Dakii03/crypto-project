import { config } from 'dotenv';
import { ethers } from 'ethers';
import fs from 'fs';
const { SwapEvent, connect } = require('./mongodb.ts');
const { createWebSocketProvider, settings, alchemy } = require("./script.ts");
const ABI = require("../abi/abi.json");
const filePath = './src/data/swapEventDB.json';

export async function getSwap(): Promise<void> {
    const usdcAddress = "0x0d4a11d5EEaaC28EC3F61d100daF4d40471f1852"; // USDC Contract
    const provider = await createWebSocketProvider(settings.apiMainnetKey);
    const contract = new ethers.Contract(usdcAddress, ABI, provider);

    connect();
    let firstObject = true;

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
        } else {
            let newData = data.slice(0, -2);
            fs.stat(filePath, (err, stats) => {
                if (err) {
                    console.error('Error checking file stats:', err);
                } else {
                    if (stats.size === 0) {
                        newData += "[\n";
                    } else {
                        newData += ",\n";
                    }

                    fs.writeFile(filePath, newData, 'utf8', (err) => {
                        if (err) {
                            console.error('Error writing file:', err);
                        } else {
                            console.log('Last character removed from the JSON file.');
                        }
                    });
                }
            });
        }
    });

    contract.on("Swap", async (sender, amount0In, amount1In, amount0Out, amount1Out, to) => {
        try {
            const objSwap = new SwapEvent({
                from: sender,
                amount0In: Number(amount0In),
                amount1In: Number(amount1In),
                amount0Out: Number(amount0Out),
                amount1Out: Number(amount1Out),
                to,
            });

            let jsonStr = JSON.stringify(objSwap, null, 2);

            if (!firstObject) {
                jsonStr = ',\n' + jsonStr;
            } else {
                firstObject = false;
            }

            fs.appendFileSync(filePath, jsonStr, 'utf8');

            objSwap.save();
            console.log("Swap event saved to the database:", objSwap);
        } catch (error) {
            console.error("Error saving swap event:", error);
        }
    });

    process.on('SIGINT', () => {
        console.log('Received SIGINT signal. Closing the file.');
        fs.appendFileSync(filePath, '\n]', 'utf8');
        console.log("Finished writing to file.");
        process.exit(0);
    });

    console.log("Initialized event listener");
}
//export { getSwap };