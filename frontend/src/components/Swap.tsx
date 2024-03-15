import { useState } from 'react';
import axios from 'axios';

interface SwapData {
  from: string;
  amount0In: number;
  amount1In: number;
  amount0Out: number;
  amount1Out: number;
  to: string;
}

function Swap() {
  const [swapData, setSwapData] = useState<SwapData[]>([]);

  const fetchSwapEvents = async () => {
    try {
      const response = await axios.get<SwapData[]>('http://localhost:3000/swap');
      setSwapData(response.data || []);
    } catch (error) {
      console.error('Error fetching swap data:', error);
    }
  };

  return (
    <div>
      <h2>Swap Data</h2>
      <button onClick={fetchSwapEvents}>Fetch Swap Events</button>
      <div>
        {swapData.length === 0 ? (
          <p>No swap events available. Click the button to fetch.</p>
        ) : (
          swapData.map((swap, index) => (
            <div key={index}>
              <p>From: {swap.from}</p>
              <p>Amount0In: {swap.amount0In}</p>
              <p>Amount1In: {swap.amount1In}</p>
              <p>Amount0Out: {swap.amount0Out}</p>
              <p>Amount1Out: {swap.amount1Out}</p>
              <p>To: {swap.to}</p>
              <hr />
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Swap;
