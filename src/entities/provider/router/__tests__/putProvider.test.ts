import request from "supertest";
import { Types } from "mongoose";
import app from "../../../../server/app";
import Provider from "../../model/Provider";
import { ProviderEntity } from "../../ProviderEntity";
import { mockProvidersFactory } from "../../factories/providersFactory";

afterEach(async () => {
  await Provider.deleteMany();
});

describe("Given a PUT /providers/:id endpoint", () => {
  describe("When it receives a request with an existing id", () => {
    test("Then it should respond with 200 and the updated provider", async () => {
      const provider = mockProvidersFactory.createOne();

      await Provider.create(provider);

      const updatedProvider: ProviderEntity = {
        ...provider,
        name: provider.name + " S.L.",
      };

      const response = await request(app)
        .put("/providers")
        .send(updatedProvider)
        .expect(200);

      const responseBody = response.body as {
        updatedProvider: ProviderEntity;
      };

      expect(responseBody.updatedProvider).toEqual(
        expect.objectContaining({
          name: updatedProvider.name,
          nif: updatedProvider.nif,
        }),
      );
    });
  });

  describe("When it receives a request with a non existing id", () => {
    test("Then it should respond with 404 and a 'Provider not found", async () => {
      const provider = mockProvidersFactory.createOne();

      const response = await request(app)
        .put("/providers")
        .send(provider)
        .expect(404);

      const responseBody: {
        error: string;
      } = response.body;

      expect(responseBody.error).toBe("Provider not found");
    });
  });

  describe("When it receives a request with an invalid id", () => {
    test("Then it should respond with 400 and a 'Invalid id' error", async () => {
      const provider = mockProvidersFactory.createOne();

      provider._id = "invalid-id" as unknown as Types.ObjectId;

      const response = await request(app)
        .put("/providers")
        .send(provider)
        .expect(400);

      const responseBody: {
        error: string;
      } = response.body;

      expect(responseBody.error).toBe("Invalid id");
    });
  });
});
