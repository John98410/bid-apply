require('dotenv').config(); // Loads .env
const path = require('path');

const express = require('express');
const app = express();  

const PORT = process.env.PORT || 80;

// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Sample route

app.use('/api', require('./routers')); // Use the routers

console.log('API Key:', process.env.OPENAI_API_KEY);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
