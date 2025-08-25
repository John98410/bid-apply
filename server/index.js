require('dotenv').config({ path: ['.env.local', '.env'] });

const express = require('express');
const app = express();  

console.log(process.env.PORT);
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Sample route

app.use('/api', require('./routers')); // Use the routers



// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
