const express = require('express');
const cors = require('cors');
require('dotenv').config();

const adminRoutes = require('./routes/adminRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// Mount Admin Routes
app.use('/api/admin', adminRoutes);

const PORT = process.env.PORT || 5000;

app.get('/api/status', (req, res) => {
  res.json({ status: 'API is running' });
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

module.exports = app;
