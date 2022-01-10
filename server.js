const express = require('express');
// const cors = require('cors');

const connectDB = require('./config/db');

require('dotenv').config();

connectDB();

const app = express();

// middleware
// app.use(cors());
app.use(express.json());

// route
app.use('/api/v1/posts', require('./routes/postRoutes'));

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`Server Running on port ${PORT}`));
