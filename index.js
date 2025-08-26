const express = require('express');
const path = require('path');
const app = express();
require('dotenv').config(); // Loads .env

const PORT = process.env.PORT || 80;
// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use('/api', require('./routers')); // Use the routers

app.use(express.static(path.join(__dirname, 'build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

console.log('API Key:', process.env.OPENAI_API_KEY ? process.env.OPENAI_API_KEY : "Not API Key");

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
