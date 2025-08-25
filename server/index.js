require('dotenv').config({ path: ['.env.local', '.env'] });

const express = require('express');
const app = express();  

console.log(process.env.PORT);
const PORT = process.env.PORT || 8080;

// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Sample route

app.use('/api', require('./routers')); // Use the routers

console.log('API Key:', process.env.OPENAI_API_KEY);    

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
