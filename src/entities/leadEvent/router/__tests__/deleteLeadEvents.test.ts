import request from "supertest";
import app from "../../../../server/app";
import LeadEvent from "../../model/LeadEvent";
import { mockLeadEventsFactory } from "../../factories/leadEventsFactory";

afterEach(async () => {
  await LeadEvent.deleteMany();
});

describe("Given a DELETE /lead-events/:id endpoint", () => {
  describe("When it receives a request with an existing id", () => {
    test("Then it should respond with 200", async () => {
      const leadEvent = mockLeadEventsFactory.createOne();

      await LeadEvent.create(leadEvent);

      await request(app).delete(`/lead-events/${leadEvent._id}`).expect(200);
    });
  });

  describe("When it receives a request with a non existing id", () => {
    test("Then it should respond with 404 and a 'Lead Event not found", async () => {
      const leadEvent = mockLeadEventsFactory.createOne();

      const response = await request(app)
        .delete(`/lead-events/${leadEvent._id}`)
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
        .delete(`/lead-events/${invalidId}`)
        .expect(400);

      const responseBody: {
        error: string;
      } = response.body;

      expect(responseBody.error).toBe("Invalid id");
    });
  });
});
