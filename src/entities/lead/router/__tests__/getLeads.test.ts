import request from "supertest";
import app from "../../../../server/app";
import Lead from "../../model/Lead";
import { LeadEntity } from "../../LeadEntity";
import { createMockLeads } from "../../factories/leadsFactory";
import LeadDto from "../../dto/leadDto";

afterEach(async () => {
  await Lead.deleteMany();
});

describe("Given a GET /leads endpoint", () => {
  describe("When it receives a request", () => {
    test("Then it should respond with 200 and two leads", async () => {
      const leads = createMockLeads(2);

      for await (const lead of leads) {
        await Lead.create(lead);
      }

      const response = await request(app).get("/leads").expect(200);

      const responseBody: {
        leads: LeadEntity[];
      } = response.body;

      leads.forEach((lead, index) => {
        expect(responseBody.leads[index]).toEqual(
          expect.objectContaining(new LeadDto(lead)),
        );
      });
    });
  });
});
