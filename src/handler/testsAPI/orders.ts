import supertest from "supertest";
import app from "../../index";

const request = supertest(app);

const token = `Token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZmlyc3RuYW1lIjoidGVzdCIsImxhc3RuYW1lIjoidGVzdCIsInVzZXJuYW1lIjoidGVzdCIsImVtYWlsIjoidGVzdEB0ZXN0LmNvbSIsImlhdCI6MTY3MzQ2NDgxN30.f0wYqLqwWOkv5GIhS342epTJimk9J4Zlak5sjXvA9aQ`;

export default describe("# test all Endpoints related by orders", () => {
    it("should create endpoint  status  to be 200", async () => {
        const res = await request
            .post("/order/1/1")
            .send({
                order_status: "active",
                quantity: 2,
            })
            .set("Cookie", token);
        expect(res.status).toBe(200);
    });

    it("should showAll endpoint  status  to be 200", async () => {
        const res = await request.get("/orders/1").set("Cookie", token);
        expect(res.status).toBe(200);
    });

    it("should showOne endpoint  status  to be 200", async () => {
        const res = await request.get("/order/1/1").set("Cookie", token);
        expect(res.status).toBe(200);
    });

    it("should edit endpoint  status  to be 200", async () => {
        const res = await request
            .post("/order/1/update/1")
            .send({
                quantity: 3,
                order_status: "Completed",
            })
            .set("Cookie", token);
        expect(res.status).toBe(200);
    });

    it("should delete endpoint  status  to be 200", async () => {
        const res = await request
            .post("/order/1/delete/1")
            .set("Cookie", token);
        expect(res.status).toBe(200);
    });
});
