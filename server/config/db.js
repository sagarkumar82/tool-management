const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables from .env

// Connection URI
const url = process.env.MONGO_URI;
console.log(url)

if (!url) {
  process.exit(1); 
}

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to database');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err.message);
    process.exit(1); 
  });

const db = mongoose.connection;

db.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

module.exports = db;
