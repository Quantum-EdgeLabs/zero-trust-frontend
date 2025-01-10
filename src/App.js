import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    expiry: '',
    cvv: '',
  });
  const [responseMessage, setResponseMessage] = useState('');

  const handleChange = (e) => {
    setPaymentData({
      ...paymentData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Simulate sending protected payment data
      const response = await axios.post('https://example.com/api/payment', {
        cardNumber: paymentData.cardNumber, // Encrypt in production
        expiry: paymentData.expiry,
        cvv: paymentData.cvv,
      });
      setResponseMessage('Payment processed successfully.');
    } catch (error) {
      setResponseMessage('Payment processing failed.');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>ZeroTrust Payment Form</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Card Number:</label>
          <input
            type="text"
            name="cardNumber"
            value={paymentData.cardNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Expiry Date:</label>
          <input
            type="text"
            name="expiry"
            value={paymentData.expiry}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>CVV:</label>
          <input
            type="password"
            name="cvv"
            value={paymentData.cvv}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
}

export default App;
