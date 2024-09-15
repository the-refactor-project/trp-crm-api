import request from "supertest";
import app from "../../../../server/app";
import LeadEvent from "../../model/LeadEvent";
import { mockLeadEventsFactory } from "../../factories/leadEventsFactory";
import { LeadEventEntity } from "../../LeadEventEntity";
import LeadEventDto from "../../dto/leadEventDto";

afterEach(async () => {
  await LeadEvent.deleteMany();
});

describe("Given a GET /lead-events/:id endpoint", () => {
  describe("When it receives a request with an existing id", () => {
    test("Then it should respond with 200 and the lead event", async () => {
      const leadEvent = mockLeadEventsFactory.createOne();

      await LeadEvent.create(leadEvent);

      const response = await request(app)
        .get(`/lead-events/${leadEvent._id}`)
        .expect(200);

      const responseBody = response.body as {
        leadEvent: LeadEventEntity;
      };

      expect(responseBody.leadEvent).toEqual(
        expect.objectContaining(new LeadEventDto(leadEvent)),
      );
    });
  });

  describe("When it receives a request with a non existing id", () => {
    test("Then it should respond with 404 and a 'Lead Event not found", async () => {
      const lead = mockLeadEventsFactory.createOne();

      const response = await request(app)
        .get(`/lead-events/${lead._id}`)
        .expect(404);

      const responseBody: {
        error: string;
      } = response.body;

      expect(responseBody.error).toBe("Lead Event not found");
    });
  });

  describe("When it receives a request with an invalid id", () => {
    test("Then it should respond with 400 and a 'Invalid id' error", async () => {
      const invalidId = "invalid-id";

      const response = await request(app)
        .get(`/lead-events/${invalidId}`)
        .expect(400);

      const responseBody: {
        error: string;
      } = response.body;

      expect(responseBody.error).toBe("Invalid id");
    });
  });
});
