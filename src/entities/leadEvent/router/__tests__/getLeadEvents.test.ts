import request from "supertest";
import app from "../../../../server/app";
import LeadEvent from "../../model/LeadEvent";
import { mockLeadEventsFactory } from "../../factories/leadEventsFactory";
import { LeadEventEntity } from "../../LeadEventEntity";
import LeadEventDto from "../../dto/leadEventDto";

afterEach(async () => {
  await LeadEvent.deleteMany();
});

describe("Given a GET /lead-events endpoint", () => {
  describe("When it receives a request", () => {
    test("Then it should respond with 200 and two leads", async () => {
      const leadEvents = mockLeadEventsFactory.createMany(2);

      for await (const lead of leadEvents) {
        await LeadEvent.create(lead);
      }

      const response = await request(app).get("/lead-events").expect(200);

      const responseBody: {
        leadEvents: LeadEventEntity[];
      } = response.body;

      leadEvents.forEach((leadEvent, index) => {
        expect(responseBody.leadEvents[index]).toEqual(
          expect.objectContaining(new LeadEventDto(leadEvent)),
        );
      });
    });
  });
});
