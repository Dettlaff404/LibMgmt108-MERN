const express = require('express');
const app = express();
const PORT = 3600;
const bookRoute = require('./routes/BookRoute');

app.use('/api/v1',bookRoute )

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});