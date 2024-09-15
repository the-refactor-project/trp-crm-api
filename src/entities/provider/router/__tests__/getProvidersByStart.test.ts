import request from "supertest";
import app from "../../../../server/app";
import Provider from "../../model/Provider";
import { ProviderEntity } from "../../ProviderEntity";
import { mockProvidersFactory } from "../../factories/providersFactory";
import { minDebounceAllowedLength } from "../../../../const";

afterEach(async () => {
  await Provider.deleteMany();
});

describe("Given a GET /providers/start endpoint", () => {
  const start = "Test";
  const providerName = `${start} provider`;
  const providerCommercialName = `Commercial ${start}`;
  const provider1 = mockProvidersFactory.createOne({
    name: providerName,
    commercialName: providerCommercialName,
  });
  const provider2 = mockProvidersFactory.createOne({
    name: "Another provider",
    commercialName: "Commercial another provider",
  });

  describe("When it receives a request with a start 'test'", () => {
    test("Then it should respond with 200 and the provider 'Test provider'", async () => {
      await Provider.create(provider1);
      await Provider.create(provider2);

      const response = await request(app)
        .get(`/providers/start/${start}`)
        .expect(200);

      const responseBody = response.body as {
        providers: ProviderEntity[];
      };

      expect(responseBody.providers).toHaveLength(1);
      expect(responseBody.providers).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            name: provider1.name,
            nif: provider1.nif,
          }),
        ]),
      );
    });
  });

  describe("When it receives a request with a non matching start 'inexistent'", () => {
    test("Then it should respond with 200 and no providers", async () => {
      const response = await request(app)
        .get(`/providers/start/inexistent`)
        .expect(200);

      const responseBody: {
        providers: ProviderEntity[];
      } = response.body;

      expect(responseBody.providers).toHaveLength(0);
    });
  });

  describe("When it receives a request with a start 'te'", () => {
    test("Then it should respond with 400 and an error", async () => {
      const response = await request(app)
        .get(`/providers/start/te`)
        .expect(400);

      const responseBody: {
        error: string;
      } = response.body;

      expect(responseBody.error).toBe(
        `Search string must be ${minDebounceAllowedLength} chars long at least`,
      );
    });
  });
});
