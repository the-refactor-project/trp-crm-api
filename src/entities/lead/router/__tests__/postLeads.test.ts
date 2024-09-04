import request from "supertest";
import app from "../../../../server/app";
import { LeadEntity, LeadEntityData } from "../../LeadEntity";
import { createMockLeadDatas } from "../../factories/leadsFactory";
import LeadDto from "../../dto/leadDto";

describe("Given a POST /leads endpoint", () => {
  describe("When it receives a request with a new lead's data", () => {
    test("Then it should respond with 201 and the new lead", async () => {
      const newLeadData = createMockLeadDatas(1)[0];

      const response = await request(app)
        .post("/leads")
        .send(newLeadData)
        .expect(201);

      const responseBody: {
        lead: LeadEntity;
      } = response.body;

      expect(responseBody.lead).toEqual(
        expect.objectContaining(new LeadDto(newLeadData as LeadEntity)),
      );
    });
  });

  describe("When it receives a request with a new lead's data without name", () => {
    test("Then it should respond with 400 and a 'Missing data' error", async () => {
      const newLeadData = createMockLeadDatas(1)[0];

      const wrongNewLeadData: Partial<LeadEntityData> = {
        ...newLeadData,
      };

      delete wrongNewLeadData.name;

      const response = await request(app)
        .post("/leads")
        .send(wrongNewLeadData)
        .expect(400);

      const responseBody = response.body as { error: string };

      expect(responseBody.error).toBe("Missing or wrong data");
    });
  });
});
