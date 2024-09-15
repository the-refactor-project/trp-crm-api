import request from "supertest";
import { Types } from "mongoose";
import app from "../../../../server/app";
import LeadEvent from "../../model/LeadEvent";
import { mockLeadEventsFactory } from "../../factories/leadEventsFactory";
import { LeadEventEntity } from "../../LeadEventEntity";
import LeadEventDto from "../../dto/leadEventDto";

afterEach(async () => {
  await LeadEvent.deleteMany();
});

describe("Given a PUT /lead-events/:id endpoint", () => {
  describe("When it receives a request with an existing id", () => {
    test("Then it should respond with 200 and the updated lead event", async () => {
      const leadEvent = mockLeadEventsFactory.createOne();

      await LeadEvent.create(leadEvent);

      const updatedLeadEvent: LeadEventEntity = {
        ...leadEvent,
        description: leadEvent.description + "!!",
      };

      const response = await request(app)
        .put("/lead-events")
        .send(updatedLeadEvent)
        .expect(200);

      const responseBody = response.body as {
        updatedLeadEvent: LeadEventEntity;
      };

      expect(responseBody.updatedLeadEvent).toEqual(
        expect.objectContaining(new LeadEventDto(updatedLeadEvent)),
      );
    });
  });

  describe("When it receives a request with a non existing id", () => {
    test("Then it should respond with 404 and a 'Lead Event not found", async () => {
      const lead = mockLeadEventsFactory.createOne();

      const response = await request(app)
        .put("/lead-events")
        .send(lead)
        .expect(404);

      const responseBody: {
        error: string;
      } = response.body;

      expect(responseBody.error).toBe("Lead Event not found");
    });
  });

  describe("When it receives a request with an invalid id", () => {
    test("Then it should respond with 400 and a 'Invalid id' error", async () => {
      const leadEvent = mockLeadEventsFactory.createOne();

      leadEvent._id = "invalid-id" as unknown as Types.ObjectId;

      const response = await request(app)
        .put("/lead-events")
        .send(leadEvent)
        .expect(400);

      const responseBody: {
        error: string;
      } = response.body;

      expect(responseBody.error).toBe("Invalid id");
    });
  });
});
