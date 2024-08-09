const express = require('express');
const pool = require('./db');
const redisClient = require('./cache');
const app = express();

app.get('/users/:id', async (req, res) => {
    const userId = req.params.id;

    // Try to fetch data from Redis cache
    redisClient.get(userId, async (err, user) => {
        if (user) {
            return res.json(JSON.parse(user));
        } else {
            const result = await pool.query('SELECT * FROM users WHERE id = $1', [userId]);
            const userData = result.rows[0];

            // Store data in Redis cache
            redisClient.setex(userId, 3600, JSON.stringify(userData));

            res.json(userData);
        }
    });
});

app.listen(3001, () => {
    console.log('User Service is running on port 3001');
});

