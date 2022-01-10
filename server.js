const express = require('express');
const cors = require('cors');

const connectDB = require('./config/db');

require('dotenv').config();

const app = express();

connectDB();

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`Server Running on port ${PORT}`));
