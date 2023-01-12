import { orders_store, orderType } from "../orders";

const store = new orders_store();
const order: orderType = {
  id: 1,
  order_status: "active",
  user_id: "1",
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
      expect(
        await store.create(order.user_id, {
          order_status: "active",
        } as orderType)
      ).toEqual({
        id: 1,
        user_id: "1",
        order_status: "active",
      } as unknown as orderType);
    });
    it("should show method return data of order by user id and product id", async () => {
      expect(await store.show(order.user_id, order.id)).toEqual({
        id: 1,
        user_id: "1",
        order_status: "active",
      } as unknown as orderType);
    });
    it("should index method return data of order by id", async () => {
      expect(await store.index(order.user_id)).toEqual([
        {
          id: 1,
          user_id: "1",
          order_status: "active",
        } as unknown as orderType,
      ]);
    });
    it("should edit method return new data", async () => {
      expect(
        await store.edit(order.user_id, order.id, {
          order_status: "completed",
        } as orderType)
      ).toEqual({
        id: 1,
        user_id: "1",
        order_status: "completed",
      } as unknown as orderType);
    });

    it("should delete method return order data ", async () => {
      expect(await store.delete(order.user_id, order.id)).toEqual({
        id: 1,
        user_id: "1",
        order_status: "completed",
      } as unknown as orderType);
    });
  });
});
