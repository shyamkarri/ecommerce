const express = require('express');
const pool = require('./db');
const redisClient = require('./cache');
const app = express();

app.get('/orders/:id', async (req, res) => {
    const orderId = req.params.id;

    // Try to fetch data from Redis cache
    redisClient.get(orderId, async (err, order) => {
        if (order) {
            return res.json(JSON.parse(order));
        } else {
            const result = await pool.query('SELECT * FROM orders WHERE id = $1', [orderId]);
            const orderData = result.rows[0];

            // Store data in Redis cache
            redisClient.setex(orderId, 3600, JSON.stringify(orderData));

            res.json(orderData);
        }
    });
});

app.listen(3002, () => {
    console.log('Order Service is running on port 3002');
});

