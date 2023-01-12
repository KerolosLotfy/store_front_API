import client from "../database";

export type orderType = {
  id?: number;
  user_id: string;
  order_status: string;
};

export type orderProducts = {
  id?: number;
  order_id: string;
  product_id: string;
  quantity: number;
};

export class orders_store {
  async show(
    user_id: orderType["user_id"],
    order_id: orderType["id"]
  ): Promise<orderType> {
    try {
      const conDB = await client.connect();
      const sql = "select * from orders_store WHERE user_id =$1 And id=$2 ";
      const result = await conDB.query(sql, [user_id, order_id]);
      conDB.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `cannot show  order by user_id = ${user_id} and order_id =${order_id}  ${err}`
      );
    }
  }

  async create(
    user_id: orderType["user_id"],
    data: orderType
  ): Promise<orderType> {
    try {
      const conDB = await client.connect();
      const sql =
        "insert into orders_store(user_id, order_status) VALUES ($1,$2) RETURNING *";

      const result = await conDB.query(sql, [user_id, data.order_status]);
      conDB.release();
      const product = result.rows[0];
      return product;
    } catch (err) {
      throw new Error(`cannot create new order Error: ${err}`);
    }
  }

  async edit(
    user_id: orderType["user_id"],
    order_id: orderType["id"],
    data: orderType
  ): Promise<orderType> {
    try {
      const conDB = await client.connect();
      const sql =
        "update orders_store set  order_status=$3 where user_id=$1 and id=$2 RETURNING * ";

      const result = await conDB.query(sql, [
        user_id,
        order_id,
        data.order_status,
      ]);
      conDB.release();
      const product = result.rows[0];

      return product;
    } catch (err) {
      throw new Error(
        `cannot update  order by user_id = ${user_id} and order_id =${order_id}  ${err}`
      );
    }
  }

  async delete(
    user_id: orderType["user_id"],
    order_id: orderType["id"]
  ): Promise<orderType> {
    try {
      const conDB = await client.connect();
      const sql =
        "delete from orders_store where user_id=$1 and id=$2 RETURNING *";

      const result = await conDB.query(sql, [user_id, order_id]);
      conDB.release();
      const product = result.rows[0];
      return product;
    } catch (err) {
      throw new Error(
        `cannot delete  order by user_id = ${user_id} and order_id =${order_id}  ${err}`
      );
    }
  }

  async index(user_id: orderType["user_id"]): Promise<orderType[]> {
    try {
      const conDB = await client.connect();
      const sql = "select * from orders_store where user_id=$1";
      const result = await conDB.query(sql, [user_id]);
      //   const products = await conDB.query("select * from order_products where order_id=$1", [user_id]);
      conDB.release();
      return result.rows;
    } catch (err) {
      throw new Error(
        `cannot show  all orders by user_id = ${user_id}  ${err}`
      );
    }
  }

  async addOrderProducts(
    order_id: orderProducts["order_id"],
    product_id: orderProducts["product_id"],
    quantity: number
  ): Promise<orderType> {
    try {
      const conDB = await client.connect();
      const sql =
        "insert into order_products(order_id, product_id, quantity) values ($1,$2,$3)  returning *";
      const result = await conDB.query(sql, [order_id, product_id, quantity]);
      conDB.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `cannot create order_products by order_id = ${order_id} and  product_id = ${product_id}  ${err}`
      );
    }
  }
}
