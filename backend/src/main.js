import express from 'express';
import connectMongoDB from './mongo';
import cors from 'cors'
import route from './routes/index';

connectMongoDB();
const app = express()

// init middleware
app.use(cors());
// define routes
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use('/api', route);

// define server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is up on port ${port}.`);
});
