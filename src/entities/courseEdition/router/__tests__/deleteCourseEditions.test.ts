import request from "supertest";
import app from "../../../../server/app";
import { mockCourseEditionsFactory } from "../../factories/courseEditionsFactory";
import CourseEdition from "../../model/CourseEdition";

afterEach(async () => {
  await CourseEdition.deleteMany();
});

describe("Given a DELETE /course-editions/:id endpoint", () => {
  describe("When it receives a request with an existing id", () => {
    test("Then it should respond with 200", async () => {
      const courseEditions = mockCourseEditionsFactory.createOne();

      await CourseEdition.create(courseEditions);

      await request(app)
        .delete(`/course-editions/${courseEditions._id}`)
        .expect(200);
    });
  });

  describe("When it receives a request with a non existing id", () => {
    test("Then it should respond with 404 and a 'Edition not found", async () => {
      const courseEdition = mockCourseEditionsFactory.createOne();

      const response = await request(app)
        .delete(`/course-editions/${courseEdition._id}`)
        .expect(404);

      const responseBody: {
        error: string;
      } = response.body;

      expect(responseBody.error).toBe("Edition not found");
    });
  });

  describe("When it receives a request with an invalid id", () => {
    test("Then it should respond with 400 and a 'Invalid id' error", async () => {
      const invalidId = "invalid-id";

      const response = await request(app)
        .delete(`/course-editions/${invalidId}`)
        .expect(400);

      const responseBody: {
        error: string;
      } = response.body;

      expect(responseBody.error).toBe("Invalid id");
    });
  });
});
