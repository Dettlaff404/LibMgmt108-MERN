const express = require('express');
const app = express();
const PORT = 3600;

app.get('/', (req, res) => {
    res.send('Hello CMJD - 108');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});