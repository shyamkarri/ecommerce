CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    product_id INT,
    user_id INT,
    status VARCHAR(50)
);

