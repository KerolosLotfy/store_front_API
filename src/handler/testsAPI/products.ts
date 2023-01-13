import supertest from "supertest";
import app from "../../index";

const request = supertest(app);
import { productData } from "../../model/products";
const token = `Token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZmlyc3RuYW1lIjoidGVzdCIsImxhc3RuYW1lIjoidGVzdCIsInVzZXJuYW1lIjoidGVzdCIsImVtYWlsIjoidGVzdEB0ZXN0LmNvbSIsImlhdCI6MTY3MzQ2NDgxN30.f0wYqLqwWOkv5GIhS342epTJimk9J4Zlak5sjXvA9aQ`;

const product: productData = {
    id: 1,
    product_name: "iphone 14 pro",
    price: 500,
    user_id: "1",
    category: "phones",
    description: "good phone",
    image: "",
};

export default describe("# test all Endpoints related by products", () => {
    it("should create endpoint  status  to be 200", async () => {
        const res = await request
            .post("/product/1")
            .send(product)
            .set("Cookie", token);
        expect(res.status).toBe(200);
    });

    it("should showAll endpoint  status  to be 200", async () => {
        const res = await request.get("/products/1").set("Cookie", token);
        expect(res.status).toBe(200);
    });

    it("should showOne endpoint  status  to be 200", async () => {
        const res = await request.get("/product/1/1").set("Cookie", token);
        expect(res.status).toBe(200);
    });

    it("should edit endpoint  status  to be 200", async () => {
        const res = await request
            .post("/product/1/update/1")
            .send({
                product_name: "test",
                price: 10,
                category: "test",
                description: "test",
                image: "",
            })
            .set("Cookie", token);
        expect(res.status).toBe(200);
    });

    it("should delete endpoint  status  to be 200", async () => {
        const res = await request
            .post("/product/1/delete/1")
            .set("Cookie", token);
        expect(res.status).toBe(200);
    });
});
