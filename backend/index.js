const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

app.get('/', (req, res) => {
    res.send('Welcome to the L-essence backend!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});