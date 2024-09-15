import request from "supertest";
import app from "../../../../server/app";
import Course from "../../model/Course";
import { mockCoursesFactory } from "../../factories/coursesFactory";

afterEach(async () => {
  await Course.deleteMany();
});

describe("Given a DELETE /courses/:id endpoint", () => {
  describe("When it receives a request with an existing id", () => {
    test("Then it should respond with 200", async () => {
      const course = mockCoursesFactory.createOne();

      await Course.create(course);

      await request(app).delete(`/courses/${course._id}`).expect(200);
    });
  });

  describe("When it receives a request with a non existing id", () => {
    test("Then it should respond with 404 and a 'Course not found", async () => {
      const course = mockCoursesFactory.createOne();

      const response = await request(app)
        .delete(`/courses/${course._id}`)
        .expect(404);

      const responseBody: {
        error: string;
      } = response.body;

      expect(responseBody.error).toBe("Course not found");
    });
  });

  describe("When it receives a request with an invalid id", () => {
    test("Then it should respond with 400 and a 'Invalid id' error", async () => {
      const invalidId = "invalid-id";

      const response = await request(app)
        .delete(`/courses/${invalidId}`)
        .expect(400);

      const responseBody: {
        error: string;
      } = response.body;

      expect(responseBody.error).toBe("Invalid id");
    });
  });
});
