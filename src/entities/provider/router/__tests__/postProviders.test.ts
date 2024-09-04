import request from "supertest";
import app from "../../../../server/app";
import { ProviderEntity, ProviderEntityData } from "../../ProviderEntity";
import { createMockProviderDatas } from "../../factories/providersFactory";

describe("Given a POST /providers endpoint", () => {
  describe("When it receives a request with a new provider's data", () => {
    test("Then it should respond with 201 and the new provider", async () => {
      const newProviderData = createMockProviderDatas(1)[0];

      const response = await request(app)
        .post("/providers")
        .send(newProviderData)
        .expect(201);

      const responseBody: {
        provider: ProviderEntity;
      } = response.body;

      expect(responseBody.provider).toEqual(
        expect.objectContaining(newProviderData),
      );
    });
  });

  describe("When it receives a request with a new provider's data without name and nif", () => {
    test("Then it should respond with 400 and a 'Missing data' error", async () => {
      const newProviderData = createMockProviderDatas(1)[0];

      const wrongNewProviderData: Partial<ProviderEntityData> = {
        ...newProviderData,
      };

      delete wrongNewProviderData.name;
      delete wrongNewProviderData.nif;

      const response = await request(app)
        .post("/providers")
        .send(wrongNewProviderData)
        .expect(400);

      const responseBody = response.body as { error: string };

      expect(responseBody.error).toBe("Missing or wrong data");
    });
  });
});
