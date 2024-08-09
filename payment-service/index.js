const express = require('express');
const app = express();

app.get('/payments', (req, res) => {
    res.json([{ id: 1, status: 'Paid', orderId: 1 }, { id: 2, status: 'Pending', orderId: 2 }]);
});

app.listen(3003, () => {
    console.log('Payment Service is running on port 3003');
});

