import client from "../database";
import bcrypt from "bcrypt";
const pepper = process.env.PEPPER;
const saltRounds = process.env.SALT_ROUNDS;

export type userData = {
    id?: number;
    firstname: string;
    lastname: string;
    username: string;
    email: string;
    pass: string;
};

export class users_store {
    async index(): Promise<userData[]> {
        try {
            const conDB = await client.connect();
            const sql = "select * from users_store";
            const result = await conDB.query(sql);
            conDB.release();
            return result.rows;
        } catch (err) {
            throw new Error(`cannot show all users ${err}`);
        }
    }

    async show(id: userData["id"]): Promise<userData> {
        try {
            const conDB = await client.connect();
            const sql = "select * from users_store WHERE id = $1";
            const result = await conDB.query(sql, [id]);
            conDB.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`cannot show  user by ${id}  ${err}`);
        }
    }

    async login(email: string, pass: string): Promise<userData | false | null> {
        try {
            const conDB = await client.connect();
            const sql = "select * from users_store WHERE email=$1 ";
            const result = await conDB.query(sql, [email]);
            if (result.rows.length) {
                const user: userData = result.rows[0];
                const checkPass = bcrypt.compareSync(pass + pepper, user.pass);
                if (checkPass) {
                    conDB.release();
                    return {
                        id: user.id,
                        firstname: user.firstname,
                        lastname: user.lastname,
                        username: user.username,
                        email: user.email,
                    } as userData;
                } else {
                    return false;
                }
            }
            return null;
        } catch (error) {
            throw new Error(`cannot login user  Error:${error}`);
        }
    }

    async create(data: userData): Promise<userData | false> {
        try {
            const conDB = await client.connect();
            const sql =
                "insert into users_store(firstname, lastname, username, email, pass) VALUES ($1,$2,$3,$4,$5) RETURNING id,firstname, lastname, username, email";

            const hash = bcrypt.hashSync(
                data.pass + pepper,
                parseInt(saltRounds as string)
            );

            const result = await conDB.query(sql, [
                data.firstname,
                data.lastname,
                data.username,
                data.email,
                hash,
            ]);
            conDB.release();
            const user = result.rows[0];
            return user;
        } catch (err) {
            return false;
        }
    }

    async edit(id: userData["id"], data: userData): Promise<userData> {
        try {
            const conDB = await client.connect();
            const sql =
                "update  users_store set firstname=$2, lastname=($3), username=($4), email=($5), pass=($6) where id=($1)  RETURNING id,firstname, lastname, username, email";

            const hash = bcrypt.hashSync(
                data.pass + pepper,
                parseInt(saltRounds as string)
            );

            const result = await conDB.query(sql, [
                id,
                data.firstname,
                data.lastname,
                data.username,
                data.email,
                hash,
            ]);
            conDB.release();
            const user = result.rows[0];

            return user;
        } catch (err) {
            throw new Error(`cannot update user Data ${err}`);
        }
    }

    async delete(id: userData["id"]): Promise<userData> {
        try {
            const conDB = await client.connect();
            const sql =
                "delete from users_store  where id=($1) RETURNING id,firstname, lastname, username, email";

            const result = await conDB.query(sql, [id]);
            conDB.release();
            const user = result.rows[0];
            return user;
        } catch (err) {
            throw new Error(`cannot delete user Data ${err}`);
        }
    }
}
