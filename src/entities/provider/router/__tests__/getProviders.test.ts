import request from "supertest";
import app from "../../../../server/app";
import Provider from "../../model/Provider";
import { ProviderEntity } from "../../ProviderEntity";
import { createMockProviders } from "../../factories/providersFactory";

afterEach(async () => {
  await Provider.deleteMany();
});

describe("Given a GET /providers endpoint", () => {
  describe("When it receives a request", () => {
    test("Then it should respond with 200 and two providers", async () => {
      const providers = createMockProviders(2);

      for await (const provider of providers) {
        await Provider.create(provider);
      }

      const response = await request(app).get("/providers").expect(200);

      const responseBody: {
        providers: ProviderEntity[];
      } = response.body;

      providers.forEach((provider, index) => {
        expect(responseBody.providers[index]).toEqual(
          expect.objectContaining(provider),
        );
      });
    });
  });
});
