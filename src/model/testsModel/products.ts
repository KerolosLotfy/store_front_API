import { productData, products_store } from "../products";

const store = new products_store();
const product: productData = {
    id: 1,
    product_name: "iphone 14 pro",
    price: 500,
    user_id: "1",
    category: "phones",
    description: "good phone",
    image: "",
};

export default describe("# test all Methods related with products", async () => {
    describe("should  all methods defined", () => {
        it("should create method defined", async () => {
            expect(store.create).toBeDefined();
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
        it("should create method return object ", async () => {
            expect(await store.create(product.user_id, product)).toEqual({
                id: 1,
                product_name: "iphone 14 pro",
                price: "500.00" as unknown as number,
                user_id: "1",
                category: "phones",
                description: "good phone",
                image: "",
            });
        });
        it("should show method return data of product by id", async () => {
            expect(await store.show(product.user_id, product.id)).toEqual({
                id: 1,
                product_name: "iphone 14 pro",
                price: "500.00" as unknown as number,
                user_id: "1",
                category: "phones",
                description: "good phone",
                image: "",
            });
        });
        it("should index method return data of product by id", async () => {
            expect(await store.index()).toEqual([
                {
                    id: 1,
                    product_name: "iphone 14 pro",
                    price: "500.00" as unknown as number,
                    user_id: "1",
                    category: "phones",
                    description: "good phone",
                    image: "",
                },
            ]);
        });
        it("should edit method return new data", async () => {
            expect(
                await store.edit(product.user_id, product.id, {
                    product_name: "test",
                    price: 10,
                    category: "test",
                    description: "test",
                    image: "",
                } as productData)
            ).toEqual({
                id: 1,
                product_name: "test",
                price: "10.00" as unknown as number,
                user_id: "1",
                category: "test",
                description: "test",
                image: "",
            });
        });

        it("should delete method return product data ", async () => {
            expect(await store.delete(product.user_id, product.id)).toEqual({
                id: 1,
                product_name: "test",
                price: "10.00" as unknown as number,
                user_id: "1",
                category: "test",
                description: "test",
                image: "",
            });
        });
    });

    it("Again should create method return object ", async () => {
        expect(await store.create(product.user_id, product)).toEqual({
            id: 1,
            product_name: "iphone 14 pro",
            price: "500.00" as unknown as number,
            user_id: "1",
            category: "phones",
            description: "good phone",
            image: "",
        });
    });
});
