const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ extended: false }));

// Define Routes
app.use('/auth', require('./routes/authRoutes'));
app.use('/leads', require('./routes/leadRoutes'));
app.use('/deals', require('./routes/dealRoutes'));

app.get('/', (req, res) => res.send('Sales CRM API Running...'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
