import app from './app.js';

const PORT = process.env.PORT || 3000;

app.listen(PORT, (req, res) => {
  console.log(`Listening on http://localhost:${PORT}`);
});
