CREATE TABLE IF NOT EXISTS products_store(
    id SERIAL PRIMARY KEY, 
    user_id bigint references users_Store(id),
    product_name VARCHAR(100) NOT NULL, 
    category VARCHAR(100) NOT NUll, 
    price  NUMERIC(17, 2) NOT NULL,
    description text, 
    image text
);


alter sequence products_store_id_seq restart with 1;