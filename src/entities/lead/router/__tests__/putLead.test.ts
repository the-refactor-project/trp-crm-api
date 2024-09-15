import request from "supertest";
import app from "../../../../server/app";
import Lead from "../../model/Lead";
import { LeadEntity } from "../../LeadEntity";
import LeadDto from "../../dto/leadDto";
import { Types } from "mongoose";
import { mockLeadsFactory } from "../../factories/leadsFactory";

afterEach(async () => {
  await Lead.deleteMany();
});

describe("Given a PUT /leads/:id endpoint", () => {
  describe("When it receives a request with an existing id", () => {
    test("Then it should respond with 200 and the updated lead", async () => {
      const lead = mockLeadsFactory.createOne();

      await Lead.create(lead);

      const updatedLead: LeadEntity = {
        ...lead,
        name: lead.name + "!!",
      };

      const response = await request(app)
        .put("/leads")
        .send(updatedLead)
        .expect(200);

      const responseBody = response.body as {
        updatedLead: LeadEntity;
      };

      expect(responseBody.updatedLead).toEqual(
        expect.objectContaining(new LeadDto(updatedLead)),
      );
    });
  });

  describe("When it receives a request with a non existing id", () => {
    test("Then it should respond with 404 and a 'Lead not found", async () => {
      const lead = mockLeadsFactory.createOne();

      const response = await request(app).put("/leads").send(lead).expect(404);

      const responseBody: {
        error: string;
      } = response.body;

      expect(responseBody.error).toBe("Lead not found");
    });
  });

  describe("When it receives a request with an invalid id", () => {
    test("Then it should respond with 400 and a 'Invalid id' error", async () => {
      const lead = mockLeadsFactory.createOne();

      lead._id = "invalid-id" as unknown as Types.ObjectId;

      const response = await request(app).put("/leads").send(lead).expect(400);

      const responseBody: {
        error: string;
      } = response.body;

      expect(responseBody.error).toBe("Invalid id");
    });
  });
});
