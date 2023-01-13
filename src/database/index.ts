import { Pool } from "pg";

import dotenv from "dotenv";

dotenv.config();

// retrun undefined (please fixed);
// const { db_user, db_name, db_test, db_pass, db_host, ENV } = process.env;

const db_user = process.env.postgres_user;
const db_name = process.env.postgres_db;
const db_test = process.env.postgres_test_db;
const db_pass = process.env.postgres_password;
const db_host = process.env.postgres_host;
const ENV = process.env.ENV;

const client = new Pool({
    user: db_user,
    database: ENV === "dev" ? db_name : db_test,
    password: db_pass,
    host: db_host,
});

export default client as Pool;
