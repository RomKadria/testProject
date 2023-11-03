import express from 'express';
import path from 'path';

const app = express();
const port = process.env.PORT || 3001;

// Serve any static files
app.use(express.static(path.join(__dirname, '../../client/dist')));

// Handle React routing, return all requests to React app
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, '../../client/dist', 'index.html'));
})

app.get('/api', (req, res) => {
  res.json({ message: 'Hello from the server!' });
});

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
