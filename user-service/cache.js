const redis = require('redis');

const client = redis.createClient({
    host: 'localhost', // Use the container name if using Docker, e.g., 'redis-cache'
    port: 6379
});

client.on('error', (err) => {
    console.error('Redis error:', err);
});

module.exports = client;

