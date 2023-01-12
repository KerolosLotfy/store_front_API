import client from "../../database";
import { userData, users_store } from "../users";

const store = new users_store();
const user: userData = {
    id: 1,
    firstname: "test",
    lastname: "test",
    email: "test@test.com",
    username: "test",
    pass: "test123",
};

export default describe("# test all Methods related with users", async () => {
    beforeEach(async () => {
        const conDB = await client.connect();
        await conDB.query(`alter sequence users_store_id_seq restart with 1;`);
        conDB.release();
    });
    describe("should  all methods defined", () => {
        it("should create method defined", async () => {
            expect(store.create).toBeDefined();
        });
        it("should login method defined", async () => {
            expect(store.login).toBeDefined();
        });
        it("should index method defined", async () => {
            expect(store.index).toBeDefined();
        });
        it("should show method defined", async () => {
            expect(store.show).toBeDefined();
        });
        it("should edit method defined", async () => {
            expect(store.edit).toBeDefined();
        });
        it("should delete method defined", async () => {
            expect(store.delete).toBeDefined();
        });
    });

    describe("should  all methods working correctly", () => {
        it("should login method return object without password", async () => {
            expect(await store.login(user.email, user.pass)).toEqual({
                id: user.id,
                firstname: user.firstname,
                lastname: user.lastname,
                username: user.username,
                email: user.email,
            } as userData);
        });
        it("should login method if email is not correctly return null", async () => {
            expect(await store.login("K@k.com", "kkk123")).toEqual(null);
        });

        it("should show method return data of user by id", async () => {
            const hashPass = await (await store.show(user.id)).pass;
            expect(await store.show(user.id)).toEqual({
                id: user.id,
                firstname: user.firstname,
                lastname: user.lastname,
                username: user.username,
                email: user.email,
                pass: hashPass,
            } as userData);
        });
        it("should index method return data of user by id", async () => {
            const hashPass = (await store.index())[0].pass;
            expect(await store.index()).toEqual([
                {
                    id: user.id,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    username: user.username,
                    email: user.email,
                    pass: hashPass,
                } as userData,
            ]);
        });
        it("should edit method return new data", async () => {
            expect(
                await store.edit(user.id, {
                    firstname: "test2",
                    lastname: "test2",
                    username: "test2",
                    email: "test@test.com",
                    pass: "test123",
                } as userData)
            ).toEqual({
                id: user.id,
                firstname: "test2",
                lastname: "test2",
                username: "test2",
                email: "test@test.com",
            } as userData);
        });

        it("should delete method return user data ", async () => {
            expect(await store.delete(user.id)).toEqual({
                id: user.id,
                firstname: "test2",
                lastname: "test2",
                username: "test2",
                email: "test@test.com",
            } as userData);
        });
        it("should create method return object without password", async () => {
            expect(await store.create(user)).toEqual({
                id: user.id,
                firstname: user.firstname,
                lastname: user.lastname,
                username: user.username,
                email: user.email,
            } as userData);
        });

        it(" Again login method  to make anthenticate with cookie token", async () => {
            expect(await store.login(user.email, user.pass)).toEqual({
                id: user.id,
                firstname: user.firstname,
                lastname: user.lastname,
                username: user.username,
                email: user.email,
            } as userData);
        });
    });
});
