# Crypto Project

This is a decentralized application (DApp) that enables users to interact with the Ethereum blockchain. It includes both backend and frontend components.

## Backend

The backend handles interactions with the Ethereum blockchain, manages transactions, and serves data to the frontend. It is built with Node.js and Express.js.

### Technologies Used

- Node.js
- Express.js
- ethers.js
- Alchemy SDK
- MongoDB
- Mongoose

### Installation

To set up the backend:

1. Clone this repository.
2. Navigate to the `backendOLD` directory.
3. Run `npm install` to install dependencies.
4. Configure environment variables for MongoDB connection and Ethereum provider API keys.
5. Start the server with `npx ts-node app.ts`.

## Frontend

The frontend, developed with React.js + Vite, communicates with the backend to fetch blockchain data and execute transactions.

### Technologies Used

- React.js
- Axios
- Vite

### Installation

To set up the frontend:

1. Navigate to the `frontend` directory.
2. Run `npm install` to install dependencies.
3. Start the development server with `yarn dev`.

## Features

- View Ethereum wallet balance
- Fetch block numbers
- Send transactions
- Fetch swap data