import request from "supertest";
import app from "../../../../server/app";
import Course from "../../model/Course";
import { CourseEntity } from "../../CourseEntity";
import { mockCoursesFactory } from "../../factories/coursesFactory";

afterEach(async () => {
  await Course.deleteMany();
});

describe("Given a GET /courses/:id endpoint", () => {
  describe("When it receives a request with an existing id", () => {
    test("Then it should respond with 200 and the course", async () => {
      const course = mockCoursesFactory.createOne();

      await Course.create(course);

      const response = await request(app)
        .get(`/courses/${course._id}`)
        .expect(200);

      const responseBody = response.body as {
        course: CourseEntity;
      };

      expect(responseBody.course).toEqual(
        expect.objectContaining({ name: course.name }),
      );
    });
  });

  describe("When it receives a request with a non existing id", () => {
    test("Then it should respond with 404 and a 'Course not found", async () => {
      const course = mockCoursesFactory.createOne();

      const response = await request(app)
        .get(`/courses/${course._id}`)
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
        .get(`/courses/${invalidId}`)
        .expect(400);

      const responseBody: {
        error: string;
      } = response.body;

      expect(responseBody.error).toBe("Invalid id");
    });
  });
});
