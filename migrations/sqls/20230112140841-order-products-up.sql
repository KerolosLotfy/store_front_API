CREATE TABLE IF NOT EXISTS order_products(
    id SERIAL PRIMARY KEY, 
    order_id bigint references orders_Store(id),
    product_id bigint references products_store(id),
    quantity integer
)

