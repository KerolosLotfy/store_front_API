import supertest from "supertest";
import app from "../../index";

const request = supertest(app);
import { userData } from "../../model/users";

const user: userData = {
    id: 1,
    firstname: "test",
    lastname: "test",
    email: "test@test.com",
    username: "test",
    pass: "test123",
};

export default describe("# test all Endpoints related by users", () => {
    it("should create endpoint  status  to be 200", async () => {
        const res = await request.post("/store/signup").send(user);
        expect(res.status).toBe(200);
    });

    it("should login endpoint  status  to be 302 (redirect)", async () => {
        const res = await request.post("/store/login").send({
            email: user.email,
            pass: user.pass,
        });
        expect(res.status).toBe(302);
    });

    it("should show endpoint  status  to be 200", async () => {
        const res = await request.get("/store/1");
        expect(res.status).toBe(200);
    });

    it("should profile endpoint  status  to be 200", async () => {
        const res = await request.get("/profile/1");
        expect(res.status).toBe(200);
    });
    it("should edit endpoint  status  to be 200", async () => {
        const res = await request.post("/update/1").send({
            firstname: "test2",
            lastname: "test2",
            email: "test@test.com",
            username: "test2",
            pass: "test123",
        });
        expect(res.status).toBe(200);
    });

    it("should delete endpoint  status  to be 200", async () => {
        const res = await request.post("/delete/1");
        expect(res.status).toBe(200);
    });
});
