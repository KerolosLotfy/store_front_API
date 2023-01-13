import client from "../database";

export type productData = {
    id?: number;
    product_name: string;
    user_id: string;
    category: string;
    price: number;
    description: string;
    image: string;
};

export class products_store {
    async show(
        user_id: productData["user_id"],
        id: productData["id"]
    ): Promise<productData> {
        try {
            const conDB = await client.connect();
            const sql =
                "select * from products_store WHERE user_id =$1 And id=$2 ";
            const result = await conDB.query(sql, [user_id, id]);
            conDB.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(
                `cannot show  product by user_id = ${user_id} and product_id =${id}  ${err}`
            );
        }
    }

    async create(
        user_id: productData["user_id"],
        data: productData
    ): Promise<productData> {
        try {
            const conDB = await client.connect();
            const sql =
                "insert into products_store(product_name,category,price,description,image, user_id) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *";

            const result = await conDB.query(sql, [
                data.product_name,
                data.category,
                data.price,
                data.description,
                data.image,
                user_id,
            ]);
            conDB.release();
            const product = result.rows[0];
            return product;
        } catch (err) {
            throw new Error(`cannot create new product Error: ${err}`);
        }
    }

    async edit(
        user_id: productData["user_id"],
        product_id: productData["id"],
        data: productData
    ): Promise<productData> {
        try {
            const conDB = await client.connect();
            const sql =
                "update products_store set product_name=$3, category=$4, price=$5, image=$6, description=$7 where user_id=$1 and id=$2 RETURNING *";

            const result = await conDB.query(sql, [
                user_id,
                product_id,
                data.product_name,
                data.category,
                data.price,
                data.image,
                data.description,
            ]);
            conDB.release();
            const product = result.rows[0];

            return product;
        } catch (err) {
            throw new Error(
                `cannot update  product by user_id = ${user_id} and product_id =${product_id}  ${err}`
            );
        }
    }

    async delete(
        user_id: productData["user_id"],
        product_id: productData["id"]
    ): Promise<productData> {
        try {
            const conDB = await client.connect();
            const sql =
                "delete from products_store where user_id=$1 and id=$2 RETURNING *";

            const result = await conDB.query(sql, [user_id, product_id]);
            conDB.release();
            const product = result.rows[0];
            return product;
        } catch (err) {
            throw new Error(`cannot delete product ${err}`);
        }
    }

    async index(): Promise<productData[]> {
        try {
            const conDB = await client.connect();
            const sql = "select * from products_store";
            const result = await conDB.query(sql);
            conDB.release();
            return result.rows;
        } catch (err) {
            throw new Error(`cannot show all products ${err}`);
        }
    }
}
