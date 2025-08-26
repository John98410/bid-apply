const path = require('path');
const express = require('express');
const app = express();  
require('dotenv').config(); // Loads .env

const PORT = process.env.PORT || 80;
// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use('/api', require('./routers')); // Use the routers

// 2️⃣ Serve static
app.use(express.static(path.join(__dirname, 'build')));

// 3️⃣ SPA catch-all
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
// Sample route


console.log('API Key:', process.env.OPENAI_API_KEY ? process.env.OPENAI_API_KEY : "Not API Key");

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
