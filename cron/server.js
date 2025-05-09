import express from 'express';
import axios from 'axios';
import { CronJob } from 'cron';

const app = express();
const PORT = process.env.PORT || 3000;

const EXTERNAL_API_URL = 'https://app.fosenservice.no/api/syncProducts';


const job = new CronJob(
  '0 */6 * * *', // Cron job: runs every 6 hours (at minute 0 past every 6th hour)
  // '*/10 * * * * *', // every 10 seconds running cron
  async () => {
    try {
      console.log(`[${new Date().toISOString()}] Running scheduled task of syncProducts api...`);
      const response = await axios.get(EXTERNAL_API_URL);
      console.log('API response status:', response.status);
    } catch (error) {
      console.error('Error hitting external API:', error.message);
    }
  },
  null,
  true,
  'America/Los_Angeles'
);

app.get('/', (req, res) => {
  res.send('Express server with scheduled cron job is running.');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}...🚀`);
});
