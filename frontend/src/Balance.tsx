import { useState, useEffect } from 'react';
import axios from 'axios';

interface BalanceData {
  balance: string;
}

function Balance() {
  const [balance, setBalance] = useState<string>('');

  useEffect(() => {
    async function fetchBalance() {
      try {
        const response = await axios.get<BalanceData>('http://localhost:3000/balance');
        setBalance(response.data.balance);
      } catch (error) {
        console.error('Error fetching balance:', error);
      }
    }

    fetchBalance();
  }, []);

  return (
    <div>
      <h2>Balance</h2>
      <p>{balance}</p>
    </div>
  );
}

export default Balance;
