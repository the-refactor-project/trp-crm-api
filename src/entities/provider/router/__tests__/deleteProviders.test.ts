import request from "supertest";
import app from "../../../../server/app";
import { createMockProviders } from "../../factories/providersFactory";
import Provider from "../../model/Provider";

afterEach(async () => {
  await Provider.deleteMany();
});

describe("Given a DELETE /providers/:id endpoint", () => {
  describe("When it receives a request with an existing id", () => {
    test("Then it should respond with 200", async () => {
      const provider = createMockProviders(1)[0];

      await Provider.create(provider);

      await request(app).delete(`/providers/${provider._id}`).expect(200);
    });
  });

  describe("When it receives a request with a non existing id", () => {
    test("Then it should respond with 404 and a 'Provider not found", async () => {
      const provider = createMockProviders(1)[0];

      const response = await request(app)
        .delete(`/providers/${provider._id}`)
        .expect(404);

      const responseBody: {
        error: string;
      } = response.body;

      expect(responseBody.error).toBe("Provider not found");
    });
  });

  describe("When it receives a request with an invalid id", () => {
    test("Then it should respond with 400 and a 'Invalid id' error", async () => {
      const invalidId = "invalid-id";

      const response = await request(app)
        .delete(`/providers/${invalidId}`)
        .expect(400);

      const responseBody: {
        error: string;
      } = response.body;

      expect(responseBody.error).toBe("Invalid id");
    });
  });
});
