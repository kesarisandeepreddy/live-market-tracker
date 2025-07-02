const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());

app.get('/api/indices', async (req, res) => {
  try {
    const { data } = await axios.get('https://priceapi.moneycontrol.com/techCharts/indianMarket/indexData?indices=5,9');

    const sensex = data['5'];
    const nifty = data['9'];

    res.json({
      sensex: {
        value: sensex.lastPrice,
        change: sensex.change,
        percent: sensex.pChange,
      },
      nifty: {
        value: nifty.lastPrice,
        change: nifty.change,
        percent: nifty.pChange,
      }
    });
  } catch (err) {
    console.error('Error:', err.message);
    res.status(500).json({ error: 'Failed to fetch index data' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});