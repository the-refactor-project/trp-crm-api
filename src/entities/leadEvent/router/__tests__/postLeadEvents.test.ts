import request from "supertest";
import app from "../../../../server/app";
import { mockLeadEventsFactory } from "../../factories/leadEventsFactory";
import { LeadEventEntity, LeadEventEntityData } from "../../LeadEventEntity";
import LeadEventDto from "../../dto/leadEventDto";

describe("Given a POST /lead-events endpoint", () => {
  describe("When it receives a request with a new lead event's data", () => {
    test("Then it should respond with 201 and the new lead event", async () => {
      const newEventLeadData = mockLeadEventsFactory.createOneItemData();

      const response = await request(app)
        .post("/lead-events")
        .send(newEventLeadData)
        .expect(201);

      const responseBody: {
        leadEvent: LeadEventEntity;
      } = response.body;

      expect(responseBody.leadEvent).toEqual(
        expect.objectContaining(
          new LeadEventDto(newEventLeadData as LeadEventEntity),
        ),
      );
    });
  });

  describe("When it receives a request with a new lead event's data without description", () => {
    test("Then it should respond with 400 and a 'Missing data' error", async () => {
      const newLeadEventData = mockLeadEventsFactory.createOneItemData();

      const wrongNewLeadEventData: Partial<LeadEventEntityData> = {
        ...newLeadEventData,
      };

      delete wrongNewLeadEventData.description;

      const response = await request(app)
        .post("/lead-events")
        .send(wrongNewLeadEventData)
        .expect(400);

      const responseBody = response.body as { error: string };

      expect(responseBody.error).toBe("Missing or wrong data");
    });
  });
});
