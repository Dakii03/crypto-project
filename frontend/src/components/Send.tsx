import { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';

interface FormData {
  to: string;
  amount: string;
}

interface TransactionResponse {
  transactionHash: string;
}

function Send() {
  const [transactionHash, setTransactionHash] = useState<string>('');
  const [formData, setFormData] = useState<FormData>({ to: '', amount: '' });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post<TransactionResponse>('http://localhost:3000/send', formData);
      setTransactionHash(response.data.transactionHash);
    } catch (error) {
      console.error('Error sending transaction:', error);
    }
  };

  return (
    <div className=''>
      <h2>Send</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="to">To: </label>
          <input type="text" id="to" name="to" value={formData.to} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="amount">Amount: </label>
          <input type="text" id="amount" name="amount" value={formData.amount} onChange={handleChange} />
        </div>
        <button type="submit">Send</button>
      </form>
      {transactionHash && <p>Transaction Hash: {transactionHash}</p>}
    </div>
  );
}

export default Send;
