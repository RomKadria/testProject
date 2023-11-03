import express from 'express';
import path from 'path';
import apiRouter from './api/routes/api-router';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());


// // Serve any static files
// app.use(express.static(path.join(__dirname, '../../client/dist')));

// // Handle React routing, return all requests to React app
// app.get('*', function(req, res) {
//   res.sendFile(path.join(__dirname, '../../client/dist', 'index.html'));
// })

app.use('/api', apiRouter);

app.get('/', (req, res) => {
  res.json({ message: 'Hello from the server!', number: 4 });
});

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
