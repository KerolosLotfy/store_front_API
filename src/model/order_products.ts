import client from "../database";

export type orderProducts = {
  id?: number;
  order_id: string;
  product_id: string;
  quantity: number;
};

export class order_productsStore {
  async show(
    order_id: orderProducts["order_id"],
    product_id: orderProducts["product_id"],
    id: orderProducts["id"]
  ): Promise<orderProducts> {
    try {
      const conDB = await client.connect();
      const sql =
        "select * from order_products WHERE order_id =$1 And product_id=$2 And id=$3 ";
      const result = await conDB.query(sql, [order_id, product_id, id]);
      conDB.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `cannot show  order_products by order_id = ${order_id} and product_id =${product_id}   ${err}`
      );
    }
  }

  async create(
    order_id: orderProducts["order_id"],
    product_id: orderProducts["product_id"],
    quantity: number
  ): Promise<orderProducts> {
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

  async edit(
    order_id: orderProducts["order_id"],
    product_id: orderProducts["product_id"],
    id: orderProducts["id"],
    quantity: number
  ): Promise<orderProducts> {
    try {
      const conDB = await client.connect();
      const sql =
        "update order_products set  quantity=$4 where order_id=$1 and   product_id=$2 and id=$3 RETURNING * ";

      const result = await conDB.query(sql, [
        order_id,
        product_id,
        id,
        quantity,
      ]);
      conDB.release();
      const product = result.rows[0];

      return product;
    } catch (err) {
      throw new Error(
        `cannot update  order_products by order_id = ${order_id} and  product_id = ${product_id} and order_products_id = ${id}  ${err}`
      );
    }
  }
  //
  async delete(
    order_id: orderProducts["order_id"],
    product_id: orderProducts["product_id"],
    id: orderProducts["id"]
  ): Promise<orderProducts> {
    try {
      const conDB = await client.connect();
      const sql =
        "delete from order_products where order_id=$1 and  product_id=$2 and id=$3 RETURNING * ";

      const result = await conDB.query(sql, [order_id, product_id, id]);
      conDB.release();
      const product = result.rows[0];

      return product;
    } catch (err) {
      throw new Error(
        `cannot delete  order_products by order_id = ${order_id} and  product_id = ${product_id} and order_products_id = ${id}  ${err}`
      );
    }
  }

  async index(
    order_id: orderProducts["order_id"],
    product_id: orderProducts["product_id"]
  ): Promise<orderProducts[]> {
    try {
      const conDB = await client.connect();
      const sql =
        "select * from order_products WHERE order_id =$1 And product_id=$2 ";
      const result = await conDB.query(sql, [order_id, product_id]);
      conDB.release();
      return result.rows;
    } catch (err) {
      throw new Error(
        `cannot show All  order_products by order_id = ${order_id} and product_id =${product_id}   ${err}`
      );
    }
  }
}
