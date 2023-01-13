import client from "../database/index";
import usersSpec_endpoint from "../handler/testsAPI/users";
import usersSpec_methods from "../model/testsModel/users";
import productsSpec_endpoint from "../handler/testsAPI/products";
import productsSpec_methods from "../model/testsModel/products";
import ordersSpec_endpoint from "../handler/testsAPI/orders";
import ordersSpec_methods from "../model/testsModel/orders";

beforeEach(async () => {
    const conDB = await client.connect();
    await conDB.query(`alter sequence users_store_id_seq restart with 1;`);
    await conDB.query(`alter sequence products_store_id_seq restart with 1;`);
    await conDB.query(`alter sequence orders_store_id_seq restart with 1;`);
    conDB.release();
});

usersSpec_endpoint;
usersSpec_methods;

productsSpec_endpoint;
productsSpec_methods;

ordersSpec_endpoint;
ordersSpec_methods;
