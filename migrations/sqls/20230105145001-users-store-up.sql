CREATE TABLE IF NOT EXISTS users_store(
    id SERIAL PRIMARY KEY, 
    firstname VARCHAR(50), 
    lastname VARCHAR(50), 
    username VARCHAR(50), 
    email VARCHAR(50) UNIQUE,
    pass text
);
alter sequence users_store_id_seq restart with 1;