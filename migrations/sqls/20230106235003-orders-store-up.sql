CREATE TABLE IF NOT EXISTS orders_store(
    id SERIAL PRIMARY KEY, 
    user_id bigint references users_Store(id),
    order_status VARCHAR(50)
);


Alter sequence orders_store_id_seq restart with 1;