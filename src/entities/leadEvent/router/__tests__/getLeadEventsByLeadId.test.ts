import request from "supertest";
import app from "../../../../server/app";
import LeadEvent from "../../model/LeadEvent";
import { mockLeadEventsFactory } from "../../factories/leadEventsFactory";
import { LeadEventEntity } from "../../LeadEventEntity";
import LeadEventDto from "../../dto/leadEventDto";

afterEach(async () => {
  await LeadEvent.deleteMany();
});

describe("Given a GET /lead-events/lead/:leadId endpoint", () => {
  describe("When it receives a request with an existing id", () => {
    test("Then it should respond with 200 and the lead's events", async () => {
      const leadEvent1 = mockLeadEventsFactory.createOne();
      const leadEvent2 = mockLeadEventsFactory.createOne({
        leadId: leadEvent1.leadId,
      });
      const leadEvents = [leadEvent1, leadEvent2];

      await LeadEvent.create(leadEvent1);
      await LeadEvent.create(leadEvent2);

      const response = await request(app)
        .get(`/lead-events/lead/${leadEvent1.leadId}`)
        .expect(200);

      const responseBody = response.body as {
        leadEvents: LeadEventEntity[];
      };

      leadEvents.forEach((leadEvent, index) => {
        expect(responseBody.leadEvents[index]).toEqual(
          expect.objectContaining(new LeadEventDto(leadEvent)),
        );
      });
    });
  });
});
