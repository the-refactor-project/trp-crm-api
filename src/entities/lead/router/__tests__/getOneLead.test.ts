import request from "supertest";
import app from "../../../../server/app";
import Lead from "../../model/Lead";
import { LeadEntity } from "../../LeadEntity";
import LeadDto from "../../dto/leadDto";
import { mockLeadsFactory } from "../../factories/leadsFactory";

afterEach(async () => {
  await Lead.deleteMany();
});

describe("Given a GET /leads/:id endpoint", () => {
  describe("When it receives a request with an existing id", () => {
    test("Then it should respond with 200 and the lead", async () => {
      const lead = mockLeadsFactory.createOne();

      await Lead.create(lead);

      const response = await request(app).get(`/leads/${lead._id}`).expect(200);

      const responseBody = response.body as {
        lead: LeadEntity;
      };

      expect(responseBody.lead).toEqual(
        expect.objectContaining(new LeadDto(lead)),
      );
    });
  });

  describe("When it receives a request with a non existing id", () => {
    test("Then it should respond with 404 and a 'Lead not found", async () => {
      const lead = mockLeadsFactory.createOne();

      const response = await request(app).get(`/leads/${lead._id}`).expect(404);

      const responseBody: {
        error: string;
      } = response.body;

      expect(responseBody.error).toBe("Lead not found");
    });
  });

  describe("When it receives a request with an invalid id", () => {
    test("Then it should respond with 400 and a 'Invalid id' error", async () => {
      const invalidId = "invalid-id";

      const response = await request(app)
        .get(`/leads/${invalidId}`)
        .expect(400);

      const responseBody: {
        error: string;
      } = response.body;

      expect(responseBody.error).toBe("Invalid id");
    });
  });
});
