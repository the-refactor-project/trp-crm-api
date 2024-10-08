import request from "supertest";
import app from "../../../../server/app";
import Lead from "../../model/Lead";
import { mockLeadsFactory } from "../../factories/leadsFactory";

afterEach(async () => {
  await Lead.deleteMany();
});

describe("Given a DELETE /leads/:id endpoint", () => {
  describe("When it receives a request with an existing id", () => {
    test("Then it should respond with 200", async () => {
      const lead = mockLeadsFactory.createOne();

      await Lead.create(lead);

      await request(app).delete(`/leads/${lead._id}`).expect(200);
    });
  });

  describe("When it receives a request with a non existing id", () => {
    test("Then it should respond with 404 and a 'Lead not found", async () => {
      const lead = mockLeadsFactory.createOne();

      const response = await request(app)
        .delete(`/leads/${lead._id}`)
        .expect(404);

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
        .delete(`/leads/${invalidId}`)
        .expect(400);

      const responseBody: {
        error: string;
      } = response.body;

      expect(responseBody.error).toBe("Invalid id");
    });
  });
});
