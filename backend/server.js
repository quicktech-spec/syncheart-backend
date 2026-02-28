const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Basic routes
app.get('/api/health', (req, res) => {
    res.json({ status: 'Engine active', version: '2.0.0' });
});

// Placeholder for other routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/sync', require('./routes/syncRoutes'));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`SynchHeart V2 Backend running on port ${PORT}`);
});
